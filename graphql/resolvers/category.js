export default {
  Query: {
    categories: async (parent, args, { models }) => {
      const categories = await models.Category.findAll();
      return categories;
    },
    category: async (parent, { id }, { models }) => {
      const category = await models.Category.findByPk(id);
      return category;
    }
  },
  Category: {
    articles: parent => parent.getArticles()
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
