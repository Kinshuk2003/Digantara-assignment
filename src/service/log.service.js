import fs from 'fs';
import { LOG_FILE_PATH } from '../utils/utils.js';
import { getAllLogs, insertLog, getLogsByFilter, bulkCreate } from '../repository/log.repository.js';

// Function to log the execution of an algorithm
export async function logExecution(algorithm, input, output, status, executionTime) {
    const timestamp = new Date().toISOString();
    try {
        // Insert the log into the database
        await insertLog(timestamp, algorithm, input, output, status, executionTime);
    } catch (err) {
        console.error("Error inserting log:", err);
    }
}

// Function to retrieve logs based on optional filters
export async function getLogs(filter = {}) {
    try {
        return await getLogsByFilter(filter);
    } catch (err) {
        console.error("Error fetching logs:", err);
        throw new Error("Error fetching logs");
    }
}

// Function to write logs to a file
export const writeLogsToFile = async () => {
    try {
        const rows = await getAllLogs();
        fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(rows, null, 2));
        console.log("Logs saved to logs.json");
    } catch (err) {
        console.error("Error fetching logs:", err);
    }
};

// Function to load logs from a file
export const loadLogsFromFile = async () => {
    if (fs.existsSync(LOG_FILE_PATH)) {
        const logs = JSON.parse(fs.readFileSync(LOG_FILE_PATH, 'utf8'));
        await bulkCreate(logs);
        console.log("Logs loaded from logs.json");
    } else {
        console.log("No logs file found. Starting with an empty database.");
    }
};