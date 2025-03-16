import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { binarySearch as binarySearchService, linearSearch as linearSearchService } from '../service/search.service.js';
import { measureExecutionTime } from '../utils/utils.js';
import { logExecution } from '../service/log.service.js';

// Controller function to handle search requests
export async function searchController(req, res, next) {
    try {
        // Destructure the input from the request body
        const { algorithm, input, target } = req.body;
        
        // Check if the algorithm is Binary Search or Linear Search
        if (algorithm == 'Binary Search') {
            // Measure the execution time of the Binary Search service function
            const { result, executionTime } = await measureExecutionTime(binarySearchService, input, target);
            const { msg, index } = result;

            // Log the execution details
            logExecution("Binary Search", {input, target}, index, msg, executionTime);
            
            return res.status(StatusCodes.OK).json({
                "message": msg, 
                "output": index,
                "executionTime": `${executionTime.toFixed(2)} ms`
            });
        } else if (algorithm == 'Linear Search') {
            // Measure the execution time of the Linear Search service function
            const { result, executionTime } = await measureExecutionTime(linearSearchService, input, target);
            const { msg, index } = result;

            // Log the execution details
            logExecution("Linear Search", {input, target}, index, msg, executionTime);
            
            return res.status(StatusCodes.OK).json({
                "message": msg, 
                "output": index,
                "executionTime": `${executionTime.toFixed(2)} ms`
            });
        } else {
            // Log the error details
            logExecution("Search", req.body, "", "Invalid algorithm", 0);
            
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                message: "Invalid algorithm" 
            });
        }
    } catch (error) {
        // Log the error details
        logExecution("Search", req.body, "", error.message, 0);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR 
        });
    }
}