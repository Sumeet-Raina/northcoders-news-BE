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
        console.log(body);
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
      });
  });

  test("404: endpoint not found", () => {
    return request(app).get("/api/nonexistent").expect(404);
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
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  test("404: endpoint not found", () => {
    return request(app).get("/api/nonexistent").expect(404);
  });
});

