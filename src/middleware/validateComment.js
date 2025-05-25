const { patchCommentSchema } = require("../../db/validation/commentSchemas");

function validateCommentId(req, res, next) {
  const { comment_id } = req.params;
  const id = Number(comment_id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid comment id" });
  }

  req.commentId = id;
  next();
}

function validatePatchComment(req, res, next) {
  const { error, value } = patchCommentSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((d) => d.message) });
  }

  req.patchData = value;
  next();
}

module.exports = { validateCommentId, validatePatchComment };
