module.exports = {
  development: {
    url: 'postgres://localhost:5432/sequelize_pro_dev',
    dialect: 'postgres'
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  }
};
