import queryLoader from '../queryLoaderConfig';

export default {
  Query: {
    categories: async (parent, args, { models }, info) => {
      const { Category } = models;
      // query options prepare attributes and associated model includes
      const queryOptions = queryLoader.getQueryOptions(models, Category, info);

      const categories = await Category.findAll(queryOptions);
      return categories;
    },
    category: async (parent, { id }, { models }, info) => {
      const { Category } = models;
      const queryOptions = queryLoader.getQueryOptions(models, Category, info);

      const category = await Category.findByPk(id, queryOptions);
      return category;
    }
  },
  Category: {
    articles: async (parent) => {
      const { articles } = parent;
      return articles;
    }
  },
  Mutation: {
    createCategory: async (parent, args, { models: { Category } }) => {
      const newCategory = await Category.create(args);
      return newCategory;
    },
    deleteCategory: async (parent, { id }, { models: { Category } }) => {
      const category = await Category.findByPk(id);
      if (!category) {
        return false;
      }

      const result = await category.destroy();
      if (!result) {
        return false;
      }

      return true;
    },
  }
};
