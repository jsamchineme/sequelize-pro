import { Router } from 'express';
import { userSignup, followUser, getUser } from '../controllers/users';

const userRoutes = Router();

userRoutes.post('/', userSignup);
userRoutes.get('/:userId', getUser);
userRoutes.post('/:userId/follow', followUser);

export default userRoutes;