const Joi = require("joi");

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const validationErrorType = error.details[0].type;
    const validationErrorField = error.details[0].path[0];

    switch (validationErrorType) {
      case "any.required":
        res.status(400).json({
          message: `Missing required ${validationErrorField} field`,
        });
        break;
      case "string.min":
        res.status(400).json({
          message: `${validationErrorField} must be at least 7 characters.`,
        });
        break;

      case "string.email":
        res.status(400).json({
          message: `Please enter a valid ${validationErrorField}.`,
        });
        break;

      default:
        break;
    }
    return;
  }
  next();
};

module.exports = {
  userValidation,
};
