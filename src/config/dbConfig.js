import sqlite3 from 'sqlite3';
import fs from 'fs';

// In-memory DB (fast, temporary storage)
export const memoryDb = new sqlite3.Database(':memory:', (err) => {
    if (err) console.error("Error opening in-memory DB:", err);
    else {
        console.log("Connected to in-memory SQLite database.");

        // Create logs table in the database
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT,
                algorithm TEXT,
                input TEXT,
                output TEXT,
                status TEXT,
                execution_time_ms REAL
            )`;

        memoryDb.run(createTableQuery, (err) => {
            if (err) {
                console.error("Error creating logs table:", err);
            } else {
                console.log("Logs table created successfully.");
                loadLogsFromFile();
            }
        });
    }
});

// Function to load logs from a file into the in-memory database
const loadLogsFromFile = () => {
    if (fs.existsSync('logs.json')) {
        const logs = JSON.parse(fs.readFileSync('logs.json', 'utf8'));
        const insertQuery = `INSERT INTO logs (timestamp, algorithm, input, output, status, execution_time_ms) VALUES (?, ?, ?, ?, ?, ?)`;

        logs.forEach(log => {
            memoryDb.run(insertQuery, [log.timestamp, log.algorithm, log.input, log.output, log.status, log.execution_time_ms], (err) => {
                if (err) {
                    console.error("Error inserting log:", err);
                }
            });
        });

        console.log("Logs loaded from logs.json");
    }else{
        console.log("No logs file found. Starting with an empty database.");
    }
};