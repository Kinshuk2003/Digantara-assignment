import express from 'express';
import v1Router from './v1/index.js';
import { fetchLogs } from '../controller/log.controller.js';


const router = express.Router();

// Define the routes for the API
router.use('/v1', v1Router);

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Fetch logs based on query parameters
 *     tags: [Logs]
 *     parameters:
 *       - in: query
 *         name: algorithm
 *         schema:
 *           type: string
 *         description: Filter logs by algorithm name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter logs by status
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter logs by date
 *     responses:
 *       200:
 *         description: Logs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                       algorithm:
 *                         type: string
 *                       input:
 *                         type: string
 *                       output:
 *                         type: string
 *                       status:
 *                         type: string
 *                       execution_time_ms:
 *                         type: number
 *       500:
 *         description: Internal server error
 */
router.get('/logs', fetchLogs);

export default router;