const { sequelize } = require('./models'); // Import depuis models/index.js

const syncModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection successful');
        await sequelize.sync({ alter: true }); // Alter ou force selon le besoin
        console.log('All models synchronized');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
};

syncModels();
