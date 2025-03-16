import express from 'express';
import { validate } from '../../validations/Validator.js';
import { searchValidation } from '../../validations/search.validation.js';
import { sortValidation } from '../../validations/sort.validation.js';
import { breadthFirstSearchValidation } from '../../validations/breadthFirstSearch.validation.js';
import { searchController } from '../../controller/search.controller.js';
import { sortController } from '../../controller/sort.controller.js';
import { BreadthFirstSearchController } from '../../controller/breadthFirstSearch.controller.js';



const router = express.Router();

// Define the routes for the API
router.post('/search', validate(searchValidation), searchController);
router.post('/sort', validate(sortValidation), sortController);
router.post('/bfs', validate(breadthFirstSearchValidation), BreadthFirstSearchController);

export default router;