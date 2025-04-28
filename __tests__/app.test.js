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
