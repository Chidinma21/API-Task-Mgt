import express from 'express';

import { signUp } from '../../../controllers/taskOwners/signUp.controller';
import { login } from '../../../controllers/taskOwners/login.controller';
import { userLogin, userSignUp } from '../../../validations/auth';
import { validate } from '../../../validations/validate';

const router = express.Router();

router.post('/signUp', validate(userSignUp), signUp);
router.post('/login', validate(userLogin), login);

export default router;
