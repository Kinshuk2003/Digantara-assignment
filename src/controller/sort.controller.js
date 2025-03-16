import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { quickSort as quickSortService } from '../service/sort.service.js';
import { measureExecutionTime } from '../utils/utils.js';
import { logExecution } from '../service/log.service.js';

// Controller function to handle sort requests
export const sortController = async (req, res) => {
    try {
        // Destructure the input from the request body
        const { algorithm, input } = req.body;

        // Check if the algorithm is Quick Sort
        if (algorithm == 'Quick Sort'){
            // Measure the execution time of the Quick Sort service function
            const { result, executionTime } = await measureExecutionTime(quickSortService, input);
            const { msg, arr } = result;

            // Log the execution details
            logExecution(algorithm, input, arr, msg, executionTime);
            
            return res.status(StatusCodes.OK).json({
                "message": msg, 
                "output": arr,
                "executionTime": `${executionTime.toFixed(2)} ms`
                });
        }else
        {
            // Log the error details
            logExecution("Sort", req.body, "", "Invalid algorithm", 0);
            
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid algorithm" 
            });
        }

    } catch (error) {
        // Log the error details
        logExecution("Sort", req.body, "", error.message, 0);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR 
        });
    }
}