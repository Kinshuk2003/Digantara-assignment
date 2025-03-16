import { Log } from '../models/log.model.js';

export const getAllLogs = async () => {
    return await Log.findAll();
};

export const insertLog = async (timestamp, algorithm, input, output, status, executionTime) => {
    return await Log.create({
        timestamp,
        algorithm,
        input: JSON.stringify(input),
        output: JSON.stringify(output),
        status,
        execution_time_ms: executionTime,
    });
};

export const getLogsByFilter = async (filter) => {
    const where = {};
    if (filter.algorithm) where.algorithm = filter.algorithm;
    if (filter.date) where.timestamp = filter.date;
    if (filter.status) where.status = filter.status;

    return await Log.findAll({ where });
};


export const bulkCreate = async (logs) => {
    return await Log.bulkCreate(logs);
}