const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().max(255).required(),
  name: Joi.string().max(60).required(),
  avatar_url: Joi.string().uri().max(1000).required(),
});

const topicSchema = Joi.object({
  slug: Joi.string().max(255).required(),
  description: Joi.string().max(600).allow("").required(),
  img_url: Joi.string().uri().max(1000).allow("").optional(),
});

const articleSchema = Joi.object({
  title: Joi.string().max(100).required(),
  topic: Joi.string().max(255).required(),
  author: Joi.string().max(255).required(),
  body: Joi.string().required(),
  created_at: Joi.date().required(),
  votes: Joi.number().integer().default(0).required(),
  article_img_url: Joi.string().uri().max(1000).allow("").required(),
});

const commentSchema = Joi.object({
  article_title: Joi.string().max(100).required(),
  body: Joi.string().required(),
  votes: Joi.number().integer().default(0).required(),
  author: Joi.string().max(100).required(),
  created_at: Joi.date().required(),
});

const seedSchema = Joi.object({
  userData: Joi.array().items(userSchema).required(),
  topicData: Joi.array().items(topicSchema).required(),
  articleData: Joi.array().items(articleSchema).required(),
  commentData: Joi.array().items(commentSchema).required(),
});

seedSchema.userSchema = userSchema;
seedSchema.topicSchema = topicSchema;
seedSchema.articleSchema = articleSchema;
seedSchema.commentSchema = commentSchema;

module.exports = seedSchema;
