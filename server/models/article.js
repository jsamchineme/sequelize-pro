module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING
    },
    authorId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
        as: 'authorId'
      }
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  Article.associate = function(models) {
    Article.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'owner'
    }),
    Article.hasMany(models.Comment, {
      foreignKey: 'articleId',
      as: 'comments'
    })
  };
  return Article;
};