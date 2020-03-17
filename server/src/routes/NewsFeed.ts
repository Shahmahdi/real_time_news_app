import { Request, Response, Router } from 'express';
import Pusher from 'pusher';
// tslint:disable-next-line:no-var-requires
const NewsAPI = require('newsapi');
// tslint:disable-next-line:no-var-requires
require('dotenv').config();

const router = Router();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true
} as any);

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const fetchNews = (searchTerm: string, pageNum: number) =>
    newsapi.v2.everything({
        q: searchTerm,
        language: 'en',
        page: pageNum,
        pageSize: 5,
    });

const updateFeed = (topic: string) => {
    let counter = 2;
    setInterval(() => {
        fetchNews(topic, counter)
            .then((response: any) => {
                pusher.trigger('news-channel', 'update-news', {
                    articles: response.articles
                });
                counter += 1;
            })
            // tslint:disable-next-line:no-console
            .catch((error: any) => console.log(error));
    }, 5000);
}

router.get('/', async (req: Request, res: Response) => {
    const topic = 'bitcoin';
    fetchNews(topic, 1)
        .then((response: any) => {
            res.json(response.articles);
            updateFeed(topic);
        })
        // tslint:disable-next-line: no-console
        .catch((err: any) => console.log(err))
});

export default router;
