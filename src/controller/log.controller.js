import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { getLogs } from '../service/log.service.js';

// Controller function to fetch logs based on query parameters
export const fetchLogs = async (req, res) => {
    const filter = req.query;
    try {
        // Fetch logs based on query parameters for logs service
        const logs = await getLogs(filter);

        return res.status(StatusCodes.OK).json({
             status: "success", 
             logs: logs
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            status: "error", 
            message: ReasonPhrases.INTERNAL_SERVER_ERROR
        });
    }
}
