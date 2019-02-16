module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    User.belongsToMany(models.User, {
      foreignKey: 'userId',
      otherKey: 'followerId',
      through: 'UserFollower',
      as: 'followers',
      timestamps: false
    }),
    User.belongsToMany(models.User, {
      foreignKey: 'followerId',
      otherKey: 'userId',
      through: 'UserFollower',
      as: 'followings',
      timestamps: false
    }),
    User.hasMany(models.Article, {
      foreignKey: 'authorId',
      as: 'publications',
    }),
    User.belongsToMany(models.Article, {
      as: 'bookmarkedArticles',
      through: 'Bookmarks',
      updatedAt: false
    })
  };
  return User;
};