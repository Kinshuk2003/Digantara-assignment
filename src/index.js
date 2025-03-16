import express from 'express';
import { PORT } from './config/serverConfig.js';
import apiRouter from './route/index.js';
import { writeLogsToFile, loadLogsFromFile } from './service/log.service.js';
import { sequelize, initializeDatabase } from './config/dbConfig.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRouter);

// Initialize database and start server
const startServer = async () => {
    await initializeDatabase();
    await sequelize.sync({ force: true }); // Synchronize models
    await loadLogsFromFile(); // Load data from file

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();

const shutdown = async () => {
    console.log("Server is shutting down...");
    try {
        await writeLogsToFile();
        console.log("Logs Saved on disk Successfully"); 
        // Ensure all processes complete before shutting down
        setTimeout(() => {
            process.exit(0);
        }, 1000);
    } catch (error) {
        console.error("Error during shutdown:", error);
        // Ensure all processes complete before shutting down
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }
};

// Handling server shutdown gracefully
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
