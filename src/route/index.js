import express from 'express';
import v1Router from './v1/index.js';
import { fetchLogs } from '../controller/log.controller.js';


const router = express.Router();

// Define the routes for the API
router.use('/v1', v1Router);
router.get('/logs', fetchLogs);

export default router;