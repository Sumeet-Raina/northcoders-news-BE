const Joi = require("joi");

const usernameParamSchema = Joi.string().max(255).required();

function validateUsernameParam(req, res, next) {
  const { error, value } = usernameParamSchema.validate(req.params.username, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      errors: error.details.map((d) => d.message),
    });
  }
  req.validatedUsername = value;
  next();
}

module.exports = validateUsernameParam;
