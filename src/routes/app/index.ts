import express from 'express';
import taskRoutes from './tasks';
import config from '../../config';

const router = express.Router();

router.use('/tasks', taskRoutes);

export default router;
