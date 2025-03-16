
// Utility function to Measure the execution time of a function
export const measureExecutionTime = async (fn, ...args) => {
    const startTime = process.hrtime();
    const result = await fn(...args);
    const endTime = process.hrtime(startTime);
    const executionTime = (endTime[0] * 1e9 + endTime[1]) / 1e6; // Convert to milliseconds
    return { result, executionTime };
};

export const LOG_FILE_PATH = 'logs.json';