import React, { useState, useEffect } from 'react';
import './App.css';
import Pusher from 'pusher-js';

function App() {

  const [newsItems, setNewsItems] = useState([]);
  const [recentData, setRecentData] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/live')
      .then(res => res.json())
      .then((article) => {
        setNewsItems([
          ...newsItems,
          ...article
        ] as any)
      }).catch(err => console.log(err));

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY!, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      encrypted: true
    });

    const channel = pusher.subscribe('news-channel');
    channel.bind('update-news', (data: any) => {
      setRecentData(data.articles);
    });
  }, [])

  useEffect(() => {
    setNewsItems([...newsItems, ...recentData]);
  }, [recentData])

  return (
    <div className="App">
      <h1 className="App-title">Live Bitcoin Feed</h1>
      <ul className="news-items">
        {newsItems.map((news: any, i) => (
          <li key={i}>
            <a href={`${news.url}`}>
              {news.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
