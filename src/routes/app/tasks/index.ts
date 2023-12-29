import express from 'express';
// import config from '../../../config';
import { createTask } from '../../../controllers/createTask.controller';
import { updateTask } from '../../../controllers/updateTask.controller';
import { getSingleTask } from '../../../controllers/findTask.controller';
import { getUserTasks } from '../../../controllers/findTasks.controller';
import { deleteUserTask } from '../../../controllers/deleteTask.controller';
import { validate } from '../../../validations/validate';
import { create, deleteTask, getTask, update } from '../../../validations/task';

const router = express.Router();

router.post('/', validate(create), createTask);
router.patch('/', validate(update), updateTask);
router.get('/', validate(getTask), getSingleTask);
router.get('/all', getUserTasks);  // Add user auth as middleware
router.delete('/',validate(deleteTask), deleteUserTask);

//Rewrite routes to best practices

export default router;
