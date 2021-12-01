"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require("supertest");
const app = require("../src/app");
describe("Test the root path", () => {
    test("It should response the GET method", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get("/");
        expect(response.statusCode).toBe(200);
    }));
});
describe("Test convert route path", () => {
    describe('/convert', () => {
        test("It should response with an error country code message", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app)
                .post("/convert")
                .set('Content-Type', 'application/json')
                .send({
                "exchange_to": "SSS",
                "amount": 100
            });
            expect(response.text).toBe('Please enter a valid country code');
        }));
        test("It should response with error validation message", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app).post("/convert");
            expect(response.text).toBe('Please enter a value for exchange_to, amount');
        }));
        test("It should response 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app)
                .post("/convert")
                .set('Content-Type', 'application/json')
                .send({
                "exchange_to": "HKD",
                "amount": 100
            });
            expect(response.statusCode).toBe(200);
        }));
    });
    describe('/history', () => {
        test("It should response with an error Dates must not be greater than today", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app)
                .post("/history")
                .set('Content-Type', 'application/json')
                .send({
                "start_date": "2022-11-10",
                "end_date": "2021-11-14",
                "exchange_to": "HKD",
                "data_type": "yearly"
            });
            expect(response.text).toBe('Dates must not be greater than today');
        }));
        test("It should response with an error Please enter a valid country code", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app)
                .post("/history")
                .set('Content-Type', 'application/json')
                .send({
                "start_date": "2020-11-10",
                "end_date": "2021-11-14",
                "exchange_to": "HKDs",
                "data_type": "yearly"
            });
            expect(response.text).toBe('Please enter a valid country code');
        }));
        test("It should response with an error Please enter a valid data type daily, monthly or yearly", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app)
                .post("/history")
                .set('Content-Type', 'application/json')
                .send({
                "start_date": "2020-11-10",
                "end_date": "2021-11-14",
                "exchange_to": "HKD",
                "data_type": "yearlys"
            });
            expect(response.text).toBe('Please enter a valid data type daily, monthly or yearly');
        }));
        test("It should response with an error Start date must not be greater than end date", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app)
                .post("/history")
                .set('Content-Type', 'application/json')
                .send({
                "start_date": "2021-11-10",
                "end_date": "2021-10-14",
                "exchange_to": "HKD",
                "data_type": "yearly"
            });
            expect(response.text).toBe('Start date must not be greater than end date');
        }));
        test("It should response 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app)
                .post("/history")
                .set('Content-Type', 'application/json')
                .send({
                "start_date": "2020-11-10",
                "end_date": "2021-11-14",
                "exchange_to": "HKD",
                "data_type": "yearly"
            });
            expect(response.statusCode).toBe(200);
        }));
    });
});
