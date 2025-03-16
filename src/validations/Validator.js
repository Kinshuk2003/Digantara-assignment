import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import { logExecution } from '../service/log.service.js';

// This is a middleware that validates the request body of the API endpoint
export const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const formattedErrors = errors.array().map(err => ({
            value: err.value,
            message: err.msg
        }));

        logExecution("Request Validator", req.body, "", "Validation Failed", 0);
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: formattedErrors,
            success: false,
            message: "Validation Failed"
        });
    };
};