import { body } from "express-validator";

// Allowed algorithms for the search endpoint
const allowedAlgorithms = ["Binary Search", "Linear Search"];

// Contains validation rules for the search endpoint
export const searchValidation = [
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
    
    body("target")
    .custom((value) => {
        if (!Number.isInteger(value)) {
            throw new Error("Target must be an integer");
        }
        return true;
    })
    .notEmpty().withMessage("Target must not be empty")
    ];