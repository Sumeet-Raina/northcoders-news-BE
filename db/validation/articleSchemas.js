const Joi = require("joi");

const idParamSchema = Joi.number().integer().positive().required();

const getArticlesQuerySchema = Joi.object({
  sort_by: Joi.string()
    .valid("author", "title", "article_id", "topic", "created_at", "votes")
    .default("created_at"),
  order: Joi.string().valid("asc", "desc").insensitive().default("desc"),
  topic: Joi.string().max(255),
  limit: Joi.number().integer().positive().default(10),
  page: Joi.number().integer().positive().default(1),
});

const postArticleSchema = Joi.object({
  author: Joi.string().max(255).required(),
  title: Joi.string().max(100).required(),
  body: Joi.string().required(),
  topic: Joi.string().max(255).required(),
  article_img_url: Joi.string().max(1000).allow("").optional(),
});

const patchArticleSchema = Joi.object({
  inc_votes: Joi.number().integer().required(),
});

const postCommentSchema = Joi.object({
  username: Joi.string().max(255).required(),
  body: Joi.string().required(),
});

module.exports = {
  idParamSchema,
  getArticlesQuerySchema,
  postArticleSchema,
  patchArticleSchema,
  postCommentSchema,
};
