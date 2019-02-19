module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please provide username'
        },
      }
    }
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
      onDelete: 'CASCADE'
    })
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login },
    });

    return user;
  };
  return User;
};