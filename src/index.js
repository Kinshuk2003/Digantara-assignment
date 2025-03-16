import express from 'express';
import { PORT } from './config/serverConfig.js';
import apiRouter from './route/index.js';
import { writeLogsToFile, loadLogsFromFile } from './service/log.service.js';
import { sequelize, initializeDatabase } from './config/dbConfig.js';
import { swaggerUi, swaggerSpec } from './config/swaggerConfig.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', apiRouter);

// Initialize database and start server
const startServer = async () => {
    await initializeDatabase();
    await sequelize.sync({ force: true }); // Synchronize models
    await loadLogsFromFile(); // Load data from file

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
};

startServer();

const shutdown = async () => {
    console.log("Server is shutting down...");
    try {
        await writeLogsToFile();
        console.log("Logs Saved on disk Successfully"); 
    } catch (error) {
        console.error("Error during shutdown:", error);
    } finally {
        // Ensure process exits after logs are written
        process.exit(0); 
    }
};

// Handling server shutdown gracefully
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown); // Handle unexpected exits
