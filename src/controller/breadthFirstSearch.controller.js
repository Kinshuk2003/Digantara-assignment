import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { breadthFirstSearch as breadthFirstSearchService } from '../service/breadthFirstSearch.service.js';
import { measureExecutionTime } from '../utils/utils.js';
import { logExecution } from '../service/log.service.js';

// Controller function to handle BFS requests
export const BreadthFirstSearchController = async (req, res) => {
    try {
        const {input, source } = req.body;
        
        // Measure the execution time of the BFS service function
        const { result, executionTime } = await measureExecutionTime(breadthFirstSearchService, input, source);
        // Extract the result and log details
        const { msg, visitedArray } = result;
        
        // Log the execution details
        logExecution("Breadth First Search", {input, source}, visitedArray, msg, executionTime);
        
        return res.status(StatusCodes.OK).json({
            "message": msg, 
            "output": visitedArray,
            "executionTime": `${executionTime.toFixed(2)} ms`
        });
    } catch (error) {
        // Log the error details
        logExecution("Breadth First Search", req.body, "", error.message, 0);
        
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: ReasonPhrases.INTERNAL_SERVER_ERROR 
        });
    }   

}