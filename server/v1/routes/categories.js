import { Router } from 'express';
import { 
  createCategory, getAllCategories, getCategory, updateCategory, deleteCategory
} from '../controllers/categories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', createCategory);
categoriesRoutes.get('/', getAllCategories);
categoriesRoutes.get('/:categoryId', getCategory);
categoriesRoutes.put('/:categoryId', updateCategory);
categoriesRoutes.delete('/:categoryId', deleteCategory);

export default categoriesRoutes;