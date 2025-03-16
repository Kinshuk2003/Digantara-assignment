import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { getLogs } from '../service/log.service.js';

// Controller function to fetch logs based on query parameters
export const fetchLogs = async (req, res) => {
    try {
        // Fetch logs based on query parameters for logs service
        const logs = await getLogs(req.query);

        return res.status(StatusCodes.OK).json({
             status: "success", 
             logs: logs
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            status: "error", 
            message: "Database query failed" 
        });
    }
}
