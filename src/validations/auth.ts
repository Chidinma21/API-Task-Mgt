import Joi from 'joi';

const userLogin = {
  body: Joi.object().keys({
    userId: Joi.string(),
    email: Joi.string(),
    password: Joi.string().required()
  })
};

const userSignUp = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

export { userLogin, userSignUp };
