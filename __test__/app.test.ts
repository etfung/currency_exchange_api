const request = require("supertest");
const app = require("../src/app");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test convert route path", () => {

  test("It should response 400", async () => {
    const response = await request(app).get("/convert");
    expect(response.statusCode).toBe(400);
  });

  test("It should response 200", async () => {
    const response = await request(app)
      .get("/convert?from='EUR'&to='HKD'&amount='20'")
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(400);
  });
})