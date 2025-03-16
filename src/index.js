import express from 'express';
import { PORT } from './config/serverConfig.js';
import apiRouter from './route/index.js';
import { memoryDb } from './config/dbConfig.js';
import fs from 'fs';

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

// Function to write logs to a file
const persistLogsToFile = () => {
    return new Promise((resolve, reject) => {
        memoryDb.all("SELECT * FROM logs", (err, rows) => {
            if (err) {
                console.error("Error fetching logs:", err);
                reject(err);
            } else {
                fs.writeFileSync('logs.json', JSON.stringify(rows, null, 2));
                console.log("Logs saved to logs.json");
                resolve();
            }
        });
    });
};

const shutdown = async () => {
    console.log("Server is shutting down...");
    try {
        await persistLogsToFile();
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
