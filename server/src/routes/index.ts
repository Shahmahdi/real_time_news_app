import { Router } from 'express';
import NewsFeed from './NewsFeed';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/live', NewsFeed);

// Export the base-router
export default router;
