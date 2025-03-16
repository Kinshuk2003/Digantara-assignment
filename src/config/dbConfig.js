import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', // Use in-memory storage
    logging: false, // Disable logging
});

export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to SQLite has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};