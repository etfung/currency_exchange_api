import convert_currency from "../src/service/convert_currency";

const request = require("supertest");
const app = require("../src/app");

describe("Test return of api", () => {
  test("It should response with all properties", async () => {
    const response = await convert_currency({ exchange_to: 'HKD', amount: 10 })

    expect(response).toHaveProperty('exchange_from')
    expect(response).toHaveProperty('exchange_to')
    expect(response).toHaveProperty('exchange_rate')
    expect(response).toHaveProperty('exchange_from_amount')
    expect(response).toHaveProperty('exchange_to_amount')
  });

  test("It should response with an error message", async () => {
    await expect(convert_currency({ exchange_to: 'HKssD', amount: 10 })).rejects.toThrow('to must have only 1 country code')
  });
})