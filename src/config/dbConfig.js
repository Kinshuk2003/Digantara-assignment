import sqlite3 from 'sqlite3';

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
            }
        });
    }
});