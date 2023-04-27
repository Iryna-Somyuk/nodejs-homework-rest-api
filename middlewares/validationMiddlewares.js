const Joi = require("joi");
const httpError = require('../helpers/HttpError');

const postValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const validationError = error.details[0].context.key;
    throw httpError(400, "missing required '${validationError}' field");
  }
  next();
};

const putValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw httpError(400, "missing fields");
  }

  next();
};

module.exports = {
  postValidation,
  putValidation,
};
