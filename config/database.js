const { Sequelize } = require('sequelize');
 
const sq = new Sequelize('nodeauth', 'root', 'password', {
    host: 'mysql',
    dialect: 'mysql'
  });
 
module.exports = sq;