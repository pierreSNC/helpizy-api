const express = require('express')
const {Sequelize} = require("sequelize");
const app = express()
const port = 3000

const sequelize = new Sequelize('helpizy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const checkDbConnexion = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

checkDbConnexion();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})