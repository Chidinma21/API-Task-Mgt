import express from 'express';
import appRoutes from './app';
import config from '../config';

const router = express.Router();

router.get('/ping', (_req, res) => {
  res.status(200).json({
    success: true,
    message: config.app,
    data: { version: config.commitHash }
  });
});

router.use('/api', appRoutes);

export default router;
