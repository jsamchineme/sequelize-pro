import { Router } from 'express';
import usersRoutes from './users';
import categoriesRoutes from './categories';
import articlesRoutes from './articles';

const allRoutes = Router();

allRoutes.use('/users', usersRoutes);
allRoutes.use('/categories', categoriesRoutes);
allRoutes.use('/articles', articlesRoutes);

export default allRoutes;