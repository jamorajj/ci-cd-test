const { Sequelize } = require('sequelize');
 
// const sq = new Sequelize('nodeauth', 'root', 'password', {
//   host: 'mysql',
//   dialect: 'mysql'
// });

const sq = new Sequelize('nodeauth', 'root', 'password', {
  host: '0.0.0.0',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: "./db/database.sqlite"
});
 
module.exports = sq;