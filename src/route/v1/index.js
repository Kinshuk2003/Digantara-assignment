import express from 'express';
import { validate } from '../../validations/Validator.js';
import { searchValidation } from '../../validations/search.validation.js';
import { sortValidation } from '../../validations/sort.validation.js';
import { breadthFirstSearchValidation } from '../../validations/breadthFirstSearch.validation.js';
import { searchController } from '../../controller/search.controller.js';
import { sortController } from '../../controller/sort.controller.js';
import { BreadthFirstSearchController } from '../../controller/breadthFirstSearch.controller.js';


const router = express.Router();

/**
 * @swagger
 * /api/v1/search:
 *   post:
 *     summary: Perform a search algorithm
 *     tags: [Search]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - algorithm
 *               - input
 *               - target
 *             properties:
 *               algorithm:
 *                 type: string
 *                 enum: [Binary Search, Linear Search]
 *                 description: The search algorithm to use
 *               input:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: The array to search in
 *               target:
 *                 type: integer
 *                 description: The target value to search for
 *     responses:
 *       200:
 *         description: Search result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 output:
 *                   type: integer
 *                 executionTime:
 *                   type: string
 *       400:
 *         description: Invalid algorithm
 *       500:
 *         description: Internal server error
 */
router.post('/search', validate(searchValidation), searchController);

/**
 * @swagger
 * /api/v1/sort:
 *   post:
 *     summary: Perform a sorting algorithm
 *     tags: [Sort]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - algorithm
 *               - input
 *             properties:
 *               algorithm:
 *                 type: string
 *                 enum: [Quick Sort]
 *                 description: The sorting algorithm to use
 *               input:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: The array to sort
 *     responses:
 *       200:
 *         description: Sort result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 output:
 *                   type: array
 *                   items:
 *                     type: integer
 *                 executionTime:
 *                   type: string
 *       400:
 *         description: Invalid algorithm
 *       500:
 *         description: Internal server error
 */
router.post('/sort', validate(sortValidation), sortController);

/**
 * @swagger
 * /api/v1/bfs:
 *   post:
 *     summary: Perform a breadth-first search algorithm
 *     tags: [Breadth First Search]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - input
 *               - source
 *             properties:
 *               input:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: integer
 *                 description: The adjacency list of the graph
 *               source:
 *                 type: integer
 *                 description: The source node to start the BFS
 *     responses:
 *       200:
 *         description: BFS result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 output:
 *                   type: array
 *                   items:
 *                     type: integer
 *                 executionTime:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post('/bfs', validate(breadthFirstSearchValidation), BreadthFirstSearchController);

export default router;