import queryLoader from '../queryLoaderConfig';

export default {
  Query: {
    articles: async (parent, args, { models }, info) => {
      const { Article } = models;
      // query options prepare attributes and associated model includes
      const queryOptions = queryLoader.getQueryOptions(models, Article, info);

      const articles = await Article.findAll(queryOptions);
      return articles;
    },
    article: async (parent, { id }, { models }, info) => {
      const { Article } = models;
      // query options prepare attributes and associated model includes
      const queryOptions = queryLoader.getQueryOptions(models, Article, info);

      const article = await Article.findByPk(id, queryOptions);
      return article;
    },
  },
  Article: {
    owner: (parent) => {
      const { owner } = parent;
      return owner;
    },
    category: (parent) => {
      const { category } = parent;
      return category;
    },
    comments: (parent) => {
      const { comments } = parent;
      return comments;
    }
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
