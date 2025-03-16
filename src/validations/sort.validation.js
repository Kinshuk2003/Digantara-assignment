import { body } from "express-validator";

// Define an array of allowed algorithms
const allowedAlgorithms = ["Quick Sort"];

// Contains validation rules for the sort endpoint
export const sortValidation = [
    body("algorithm")
    .isString().withMessage("Algorithm must be a string")
    .isIn(allowedAlgorithms).withMessage(`Algorithm must be one of ${allowedAlgorithms.join(', ')}`),
    
    body("input")
    .isArray().withMessage("Input must be an array")
    .notEmpty().withMessage("Input array must not be empty")
    .custom((value, { req }) => {
        const input = req.body.input;
        if (input.length == 0) {
            throw new Error("Input array must not be empty");
        }
        return true;
    }),
    ];