import express from 'express';
import { createTask } from '../../../controllers/tasks/createTask.controller';
import { updateTask } from '../../../controllers/tasks/updateTask.controller';
import { getSingleTask } from '../../../controllers/tasks/findTask.controller';
import { getUserTasks } from '../../../controllers/tasks/findTasks.controller';
import { deleteUserTask } from '../../../controllers/tasks/deleteTask.controller';
import { validate } from '../../../validations/validate';
import { create, deleteTask, getTask, update } from '../../../validations/task';
import { authorize } from '../../../middlewares/authorize';

const router = express.Router();

router.post('/', validate(create), authorize, createTask);
router.patch('/', validate(update), authorize, updateTask);
router.get('/', validate(getTask), authorize, getSingleTask);
router.get('/all', authorize, getUserTasks);
router.delete('/', validate(deleteTask), authorize, deleteUserTask);

export default router;
