const endpointsJson = require("../endpoints.json");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const request = require("supertest");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an topics object that contains all topics", () => {
    return request(app)
      .get("/api/topics")
      .then((response) => {
        const { topics } = response.body;
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/users", () => {
  test("200: Responds with an users object that contains all users", () => {
    return request(app)
      .get("/api/users")
      .then((response) => {
        const { users } = response.body;
        expect(users.length).toBe(4);
        users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/users/:username", () => {
  test("200: Responds with an user object that contains single user", () => {
    return request(app)
      .get("/api/users/butter_bridge")
      .then((response) => {
        const { user } = response.body;

        expect(user[0]).toEqual({
          username: "butter_bridge",
          name: "jonny",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        });
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an article object that contains all data for aticle id provided", () => {
    return request(app)
      .get("/api/articles/1")
      .then((response) => {
        const rows = response.body;
        expect(rows[0]).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          comment_count: 11,
          body: "I find this existence challenging",
          created_at: expect.any(String),
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  test("404: endpoint not found", () => {
    return request(app).get("/api/articles/7908888").expect(404);
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an object that contains all articles", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        body.articles.forEach((row) => {
          expect(row).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          });
        });
      });
  });

  test("200: Responds with an object that contains all articles by topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .then((response) => {
        expect(response.body.articles.length).toBe(10);
      });
  });

  test("404: endpoint not found", () => {
    return request(app).get("/api/nonexistent").expect(404);
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with an object that contains all articles", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .then(({ body }) => {
        body.comments.forEach((row) => {
          expect(row).toMatchObject({
            comment_id: expect.any(Number),
            article_id: expect.any(Number),
            body: expect.any(String),
            votes: expect.any(Number),
            author: expect.any(String),
            created_at: expect.any(String),
          });
        });
      });
  });

  test("404: endpoint not found", () => {
    return request(app).get("/api/articles/700/comments").expect(404);
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with an object that contains comment that was added", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
        body: "Good read, made me cry loads.",
      })
      .then((response) => {
        expect(response.status).toBe(201);
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Responds with an object that contains updated votes", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: 10,
      })
      .then((response) => {
        expect(response.status).toBe(200);
        const { article } = response.body;
        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: expect.any(String),
          votes: 110,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("Responds with 204 status and no content, deletes the given comment by comment_id", () => {
    return request(app)
      .delete("/api/comments/1")
      .send()
      .then((response) => {
        expect(response.status).toBe(204);
      });
  });
});

describe("PATCH /api/comments/:comment_id", () => {
  test("200: Responds with an comment object that contains updated votes", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({
        inc_votes: 10,
      })
      .then((response) => {
        expect(response.status).toBe(200);
        const { comment } = response.body;
        expect(comment).toEqual({
          comment_id: 1,
          article_id: 9,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          votes: 26,
          created_at: expect.any(String),
          author: "butter_bridge",
        });
      });
  });
});

describe("POST /api/articles", () => {
  test("201: creates a new article and returns the article object", () => {
    const newArticle = {
      author: "butter_bridge",
      title: "Who is Mitch?",
      body: "The man behind the legend that is Mitch",
      topic: "mitch",
      article_img_url:
        "/path/to/image/of/mitch/with/one/of/those/balck/strips/across/his/eyes",
    };

    return request(app)
      .post("/api/articles")
      .send(newArticle)
      .then((response) => {
        expect(response.status).toBe(201);
        const { article } = response.body;
        expect(article).toEqual({
          article_id: expect.any(Number),
          author: "butter_bridge",
          title: "Who is Mitch?",
          topic: "mitch",
          body: "The man behind the legend that is Mitch",
          comment_count: 0,
          votes: 0,
          article_img_url:
            "/path/to/image/of/mitch/with/one/of/those/balck/strips/across/his/eyes",
          created_at: expect.any(String),
        });
      });
  });
});

describe("POST /api/topics", () => {
  test("201: Responds with a topic object containing the newly added topic", () => {
    return request(app)
      .post("/api/topics")
      .send({
        slug: "football",
        description: "Good game",
      })
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.topic).toEqual({
          slug: "football",
          description: "Good game",
          img_url: null,
        });
      });
  });
});
