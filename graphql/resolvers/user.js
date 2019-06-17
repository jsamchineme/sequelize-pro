import queryLoader from '../queryLoaderConfig';

export default {
  Query: {
    user: (parent, { id }, { models }, info) => {
      const { User } = models;
      // query options prepare attributes and associated model includes
      const queryOptions = queryLoader.getQueryOptions(models, User, info);

      const user = User.findByPk(id, queryOptions);
      return user;
    },
    users: (parent, args, { models }, info) => {
      const { User } = models;
      // query options prepare attributes and associated model includes
      const queryOptions = queryLoader.getQueryOptions(models, User, info);

      const users = User.findAll(queryOptions);
      return users;
    },
    me: (parent, args, { me, models }, info) => {
      const { User } = models;

      // query options prepare attributes and associated model includes
      const queryOptions = queryLoader.getQueryOptions(models, User, info);

      // logger.info(queryOptions);
      const user = User.findByPk(me.id, queryOptions);
      return user;
    }
  },
  User: {
    articles: async (parent) => {
      const { articles } = parent;

      return articles;
    }
  },
  Mutation: {
    createUser: (parents, args, { models: { User } }) => {
      return User.create(args);
    }
  }
};
