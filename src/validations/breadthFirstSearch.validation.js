import { body } from "express-validator";

// Contains validation rules for the sort endpoint
export const breadthFirstSearchValidation = [
    body("input")
    .isArray().withMessage("Input must be an array")
    .notEmpty().withMessage("Input array must not be empty")
    .custom((value, { req }) => {
        const input = req.body.input;
        if (input.length == 0) {
            throw new Error("Input array must not be empty");
        }else 
        {
            for(let i=0; i<input.length; i++) {
                if (!Array.isArray(input[i])) {
                    throw new Error("Input array must contain only nested arrays");
                }
                for (let j = 0; j < input[i].length; j++) {
                    if (typeof input[i][j] !== 'number') {
                        throw new Error("Nested arrays must contain only numbers");
                    }
                }
            }
        }
        return true;
    }),
    
    body("source")
    .custom((value) => {
        if (!Number.isInteger(value)) {
            throw new Error("Source must be an integer");
        }
        return true;
    })
    .notEmpty().withMessage("Source must not be empty")
    ];