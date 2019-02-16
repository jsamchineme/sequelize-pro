import { Router } from 'express';
import { 
  createArticle, getArticle, getAllArticles, updateArticle, deleteArticle
} from '../controllers/articles';
import commentsRoutes from './comments';

const articlesRoutes = Router();

articlesRoutes.post('/', createArticle);
articlesRoutes.get('/:articleId', getArticle);
articlesRoutes.patch('/:articleId', updateArticle);
articlesRoutes.delete('/:articleId', deleteArticle);
articlesRoutes.get('/', getAllArticles);
articlesRoutes.use('/:articleId/comments', commentsRoutes);

export default articlesRoutes;