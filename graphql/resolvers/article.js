import {
  getSelectedAttributes,
  getSelectedIncludes 
} from './resolveUtils';

export default {
  Query: {
    articles: async (parent, args, { models }, info) => {
      let { Article } = models;
      const selectedAttributes = getSelectedAttributes(Article, info);
      const queryInclude = getSelectedIncludes(models, Article, info);
     
      let queryOptions = {
        attributes: selectedAttributes
      };

      if(queryInclude) {
        queryOptions.include = queryInclude;
      }

      const articles = await Article.findAll(queryOptions);
      return articles;
    },
    article: async (parent, { id }, { models }, info) => {
      let { Article } = models;
      const selectedAttributes = getSelectedAttributes(Article, info);
      const queryInclude = getSelectedIncludes(models, Article, info);
     
      let queryOptions = {
        attributes: selectedAttributes
      };

      if(queryInclude) {
        queryOptions.include = queryInclude;
      }

      const article = await Article.findByPk(id, queryOptions);
      return article;
    },
  },
  Article: {
    owner: async (parent, args, { models }, info) => {
      const owner = parent.owner;
      return owner;
    }
  },
  Mutation: {
    createArticle: async (parent, args, { me, models: { Article } }) => {
      args.slug = args.title.replace(/\s+/g, '-').toLowerCase();
      args.authorId = me.id;

      const newArticle = await Article.create(args)
      return newArticle;
    },
    deleteArticle: async (parent, { id }, { models: { Article } }) => {
      const article = Article.findByPk(id);
      if(!article) {
        return false;
      }

      const result = await article.destroy();
      if(!result) {
        return false;
      }

      return true;
    },
  }
};