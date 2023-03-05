const { Sequelize } = require('sequelize');
 
const sq = new Sequelize('nodeauth', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });
 
module.exports = sq;