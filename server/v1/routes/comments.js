import { Router } from 'express';
import { 
  createComment, updateComment, deleteComment
} from '../controllers/comments';

const commentsRoutes = Router({ mergeParams: true });

commentsRoutes.post('/', createComment);
commentsRoutes.patch('/:commentId', updateComment);
commentsRoutes.delete('/:commentId', deleteComment);

export default commentsRoutes;