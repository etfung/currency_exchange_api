const request = require("supertest");
const app = require("../src/app");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test convert route path", () => {
  describe('/convert', () => {
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

  describe('/history', () => {
    test("It should response with an error Dates must not be greater than today", async () => {
      const response = await request(app)
        .post("/history")
        .set('Content-Type', 'application/json')
        .send({
          "start_date": "2022-11-10",
          "end_date": "2021-11-14",
          "exchange_to": "HKD",
          "data_type": "yearly"
        });
      expect(response.text).toBe('Dates must not be greater than today');
    });
    test("It should response with an error Please enter a valid country code", async () => {
      const response = await request(app)
        .post("/history")
        .set('Content-Type', 'application/json')
        .send({
          "start_date": "2020-11-10",
          "end_date": "2021-11-14",
          "exchange_to": "HKDs",
          "data_type": "yearly"
        });
      expect(response.text).toBe('Please enter a valid country code');
    });
    test("It should response with an error Please enter a valid data type daily, monthly or yearly", async () => {
      const response = await request(app)
        .post("/history")
        .set('Content-Type', 'application/json')
        .send({
          "start_date": "2020-11-10",
          "end_date": "2021-11-14",
          "exchange_to": "HKD",
          "data_type": "yearlys"
        });
      expect(response.text).toBe('Please enter a valid data type daily, monthly or yearly');
    });
    test("It should response with an error Start date must not be greater than end date", async () => {
      const response = await request(app)
        .post("/history")
        .set('Content-Type', 'application/json')
        .send({
          "start_date": "2021-11-10",
          "end_date": "2021-10-14",
          "exchange_to": "HKD",
          "data_type": "yearly"
        });
      expect(response.text).toBe('Start date must not be greater than end date');
    });
    test("It should response 200", async () => {
      const response = await request(app)
        .post("/history")
        .set('Content-Type', 'application/json')
        .send({
          "start_date": "2020-11-10",
          "end_date": "2021-11-14",
          "exchange_to": "HKD",
          "data_type": "yearly"
        });

      expect(response.statusCode).toBe(200)
    });

  })

})