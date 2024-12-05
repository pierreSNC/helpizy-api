const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise")

const dbName = "helpizy";
const dbUser = "root";
const dbPassword = "";
const dbHost = "localhost";
const dbDialect = "mysql";

const createDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: dbHost,
            user: dbUser,
            password: dbPassword,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`Database "${dbName}" has been created (if it didn't exist).`);
        await connection.end();
    } catch (error) {
        console.error("Error creating database:", error);
        process.exit(1);
    }
};

const checkDbConnection = async () => {
    const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: dbDialect,
    });

    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
};

const initDatabase = async () => {
    await createDatabase();
    await checkDbConnection();
};

initDatabase();
