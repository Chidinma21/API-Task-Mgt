import Joi from 'joi';

const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    dueDate: Joi.string(),
    priority: Joi.string().required(),
    status: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  })
};

const update = {
  body: Joi.object().keys({
    taskId: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    dueDate: Joi.string(),
    priority: Joi.string(),
    status: Joi.string(),
    tags: Joi.array().items(Joi.string())
  })
};

const deleteTask = {
  query: Joi.object().keys({
    taskId: Joi.string().required()
  })
};

const getTask = {
  query: Joi.object().keys({
    taskId: Joi.string().required()
  })
};

export { create, update, deleteTask, getTask };
