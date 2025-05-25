const {
  idParamSchema,
  getArticlesQuerySchema,
  postArticleSchema,
  patchArticleSchema,
  postCommentSchema,
} = require("../../db/validation/articleSchemas");

function validateIdParam(req, res, next) {
  const { error, value } = idParamSchema.validate(req.params.article_id);
  if (error)
    return res
      .status(400)
      .json({ errors: error.details.map((d) => d.message) });
  req.articleId = value;
  next();
}

function validateGetArticlesQuery(req, res, next) {
  const { error, value } = getArticlesQuerySchema.validate(req.query, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((d) => d.message) });
  }
  req.query = value;
  next();
}

function validatePostArticle(req, res, next) {
  const { error, value } = postArticleSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error)
    return res
      .status(400)
      .json({ errors: error.details.map((d) => d.message) });
  req.validatedBody = value;
  next();
}

function validatePatchArticle(req, res, next) {
  const { error, value } = patchArticleSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error)
    return res
      .status(400)
      .json({ errors: error.details.map((d) => d.message) });
  req.patchData = value;
  next();
}

function validatePostComment(req, res, next) {
  const { error, value } = postCommentSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error)
    return res
      .status(400)
      .json({ errors: error.details.map((d) => d.message) });
  req.validatedBody = value;
  next();
}

module.exports = {
  validateIdParam,
  validateGetArticlesQuery,
  validatePostArticle,
  validatePatchArticle,
  validatePostComment,
};
