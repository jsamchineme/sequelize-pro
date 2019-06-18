module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserFollower', {
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      followerId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
    });
  },
  down: queryInterface => queryInterface.dropTable('users')
};
