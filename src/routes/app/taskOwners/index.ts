import express from 'express';
import { signUp } from '../../../controllers/taskOwners/signUp.controller';
import { login } from '../../../controllers/taskOwners/login.controller';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/login', login);

export default router;
