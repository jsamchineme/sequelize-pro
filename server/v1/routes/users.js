import { Router } from 'express';
import {
  userSignup, followUser, getUser, uploadImage
} from '../controllers/users';

const userRoutes = Router();

userRoutes.post('/', userSignup);
userRoutes.get('/:userId', getUser);
userRoutes.post('/:userId/follow', followUser);
userRoutes.post('/:userId/upload', uploadImage);

export default userRoutes;
