export default {
  Query: {
    user: (parent, { id }, { models: { User } }) => User.findByPk(id),
    users: (parent, args, { models: { User } }, info) => {
      const selections = info.fieldNodes[0].selectionSet.selections;
      const selectedFields = selections.map(i => i.name.value);
      return User.findAll({ attributes: selectedFields })
    },
    me: (parent, args, { me }) => me
  },
  User: {
    articles: (parent, args, { models }) => parent.getArticles(),
  },
  Mutation: {
    createUser: (parents, args, { models: { User } }) => {
      return User.create(args);
    }
  }
};