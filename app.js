const express = require("express");
const apiRouter = require("./src/routers/api.router");
const usersRouter = require("./src/routers/user.router");
const topicsRouter = require("./src/routers/topics.router");
const articlesRouter = require("./src/routers/articles.router");
const commentsRouter = require("./src/routers/comments.router");

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use("/api/users", usersRouter);

app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/comments", commentsRouter);

app.all("/*splat", (req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

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
