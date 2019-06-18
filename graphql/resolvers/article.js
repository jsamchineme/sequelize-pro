export default {
  Query: {
    articles: async (parent, args, { models }) => {
      const articles = await models.Article.findAll();
      return articles;
    },
    article: async (parent, { id }, { models }) => {
      const article = await models.Article.findByPk(id);
      return article;
    },
  },
  Article: {
    owner: parent => parent.getOwner(),
    category: parent => parent.getCategory(),
    comments: parent => parent.getComments(),
  },
  Mutation: {
    createArticle: async (parent, args, { me, models: { Article } }) => {
      args.slug = args.title.replace(/\s+/g, '-').toLowerCase();
      args.authorId = me.id;

      const newArticle = await Article.create(args);
      return newArticle;
    },
    deleteArticle: async (parent, { id }, { models: { Article } }) => {
      const article = Article.findByPk(id);
      if (!article) {
        return false;
      }

      const result = await article.destroy();
      if (!result) {
        return false;
      }

      return true;
    },
  }
};
