import { memoryDb } from '../config/dbConfig.js';

// Function to log the execution of an algorithm
export async function logExecution(algorithm, input, output, status, executionTime) {
    const timestamp = new Date().toISOString();
    const query = `INSERT INTO logs (timestamp, algorithm, input, output, status, execution_time_ms) VALUES (?, ?, ?, ?, ?, ?)`;

    try {
        // Insert the log into the database
        memoryDb.run(query, [timestamp, algorithm, JSON.stringify(input), JSON.stringify(output), status, executionTime]);
    } catch (err) {
        console.error("Error inserting log:", err);
    }
}

// Function to retrieve logs based on optional filters
export async function getLogs(filter = {}) {
    let query = "SELECT * FROM logs WHERE 1=1"; // Base query to select all logs
    let params = []; // Array to store query parameters

    // Add filter for algorithm if provided
    if (filter.algorithm) {
        query += " AND algorithm = ?";
        params.push(filter.algorithm);
    }

    // Add filter for date if provided
    if (filter.date) {
        query += " AND DATE(timestamp) = ?";
        params.push(filter.date);
    }

    // Add filter for status if provided
    if (filter.status) {
        query += " AND status = ?";
        params.push(filter.status);
    }

    return new Promise((resolve, reject) => {
        memoryDb.all(query, params, (err, rows) => {
            if (err) {
                console.error("Error fetching logs:", err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}