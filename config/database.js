const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('helpizy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
