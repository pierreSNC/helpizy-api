const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('helpizy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
});

module.exports = sequelize;
