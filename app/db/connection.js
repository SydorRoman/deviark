const Sequelize = require('sequelize');
const sequelize = new Sequelize('deviark', 'postgres', '1', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    port: 5432
  },
});

module.exports = {
  sequelize
};