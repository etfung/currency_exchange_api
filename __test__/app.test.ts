const request = require("supertest");
const app = require("../src/app");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test convert route path", () => {

  test("It should response with an error country code message", async () => {
    const response = await request(app)
      .post("/convert")
      .set('Content-Type', 'application/json')
      .send({
        "exchange_to": "SSS",
        "amount": 100
      });
    expect(response.text).toBe('Please enter a valid country code');
  });

  test("It should response with error validation message", async () => {
    const response = await request(app).post("/convert");
    expect(response.text).toBe('Please enter a value for exchange_to, amount');
  });

  test("It should response 200", async () => {
    const response = await request(app)
      .post("/convert")
      .set('Content-Type', 'application/json')
      .send({
        "exchange_to": "HKD",
        "amount": 100
      });

    expect(response.statusCode).toBe(200)
  });
})