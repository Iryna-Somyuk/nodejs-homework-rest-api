const Joi = require("joi");

const postValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(7).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    phone: Joi.string()
      .min(7)
      .pattern(/^[0-9-()+ ]+$/)
      .required(),
    favorite: Joi.boolean,
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
      case "string.pattern.base":
        res.status(400).json({
          message: `Please enter a valid ${validationErrorField}.`,
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

const putValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(7),
    email: Joi.string().email({
      minDomainSegments: 2,
    }),
    phone: Joi.string()
      .min(7)
      .pattern(/^[0-9-()+ ]+$/),
    favorite: Joi.boolean,
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    const validationErrorType = error.details[0].type;
    const validationErrorField = error.details[0].path[0];

    switch (validationErrorType) {
      case "object.min":
        res.status(400).json({
          message: `Missing fields.`,
        });
        break;
      case "string.min":
        res.status(400).json({
          message: `${validationErrorField} must be at least 7 characters.`,
        });
        break;
      case "string.pattern.base":
        res.status(400).json({
          message: `Please enter a valid ${validationErrorField}.`,
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

const updateFavoriteSchema = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const validationErrorType = error.details[0].type;
    const validationErrorField = error.details[0].path[0];
    console.log(validationErrorField);
    switch (validationErrorType) {
      case "any.required":
        res.status(400).json({
          message: `Missing field ${validationErrorField}`,
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
  postValidation,
  putValidation,
  updateFavoriteSchema,
};