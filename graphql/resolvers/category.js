import {
  getSelectedAttributes,
  getSelectedIncludes 
} from './resolveUtils';

export default {
  Query: {
    categories: async (parent, args, { models }, info) => {
      let { Category } = models;
      const selectedAttributes = getSelectedAttributes(Category, info);
      const queryInclude = getSelectedIncludes(models, Category, info);
     
      let queryOptions = {
        attributes: selectedAttributes
      };

      if(queryInclude) {
        queryOptions.include = queryInclude;
      }

      const categories = await Category.findAll(queryOptions);
      return categories;
    },
    category: async (parent, { id }, { models: { Category } }, info) => {
      const selectedAttributes = getSelectedAttributes(Category, info);
      const include = {};
      
      const category = await Category.findByPk(id, { attributes: selectedAttributes });
      return category;
    }
  },
  Category: {
    articles: async (parent, args, { models }, info) => {
      const articles = parent.articles;
      return articles;
    }
  },
  Mutation: {
    createCategory: async (parent, args, { models: { Category } }) => {
      const newCategory = await Category.create(args)
      return newCategory;
    },
    deleteCategory: async (parent, { id }, { models: { Category } }) => {
      const category = await Category.findByPk(id);
      if(!category) {
        return false;
      }

      const result = await category.destroy();
      if(!result) {
        return false;
      }

      return true;
    },
  }
};