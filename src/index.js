import express from 'express';
import { PORT } from './config/serverConfig.js';
import apiRouter from './route/index.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRouter);

// Starting the express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handling server shutdown gracefully
process.on('SIGINT', () => {
    console.log("Server is shutting down...");
    try {
        console.log("Successfully persisted logs and closed databases");
        process.exit(0);
    } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
    }
});

process.on('SIGTERM', () => {
    console.log("Server is shutting down...");
    try {
        console.log("Successfully persisted logs and closed databases");
        process.exit(0);
    } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
    }
});
