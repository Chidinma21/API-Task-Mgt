import express from 'express';
import taskRoutes from './tasks';
import taskOwnerRoutes from './taskOwners'

const router = express.Router();

router.use('/tasks', taskRoutes);
router.use('/taskOwner', taskOwnerRoutes)

export default router;
