export default {
  Query: {
    user: (parent, { id }, { models }) => models.User.findByPk(id),
    users: (parent, args, { models }) => models.User.findAll(),
    me: (parent, args, { me, models }) => models.User.findByPk(me.id),
  },
  User: {
    articles: parent => parent.getArticles()
  },
  Mutation: {
    createUser: (parents, args, { models: { User } }) => {
      return User.create(args);
    }
  }
};
