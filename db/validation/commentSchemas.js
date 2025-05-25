const Joi = require("joi");

const patchCommentSchema = Joi.object({
  inc_votes: Joi.number().integer().required(),
});

module.exports = { patchCommentSchema };
