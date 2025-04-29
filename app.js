const express = require("express");
const { getApi } = require("./src/controllers/api.controller");
const { getTopics } = require("./src/controllers/topics.controller");
const {
  getArticlesById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("./src/controllers/articles.controller");

const app = express();

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

// Error handling middleware
app.use((err, req, res, next) => {
  // Handle known error codes
  if (err.status && err.message) {
    return res.status(err.status).json({
      error: {
        message: err.message,
      },
    });
  }

  // Handle specific database errors
  if (err.code === "22P02" || err.code === "23502") {
    return res.status(400).json({
      error: {
        message: "Invalid input data",
      },
    });
  }

  // Handle 404 Not Found
  if (err.code === "404") {
    return res.status(404).json({
      error: {
        message: "Not Found",
      },
    });
  }

  // Handle unexpected errors
  console.error("Unexpected error:", err);
  res.status(500).json({
    error: {
      message: "Internal Server Error",
    },
  });
});

module.exports = app;
