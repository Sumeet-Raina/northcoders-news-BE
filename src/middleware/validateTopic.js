const { topicSchema } = require("../../db/validation/seedSchema");

function validateTopic(req, res, next) {
  const { error, value } = topicSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((d) => d.message) });
  }
  req.validatedBody = value;
  next();
}

module.exports = { validateTopic };
