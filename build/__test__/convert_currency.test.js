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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convert_currency_1 = __importDefault(require("../src/service/convert_currency"));
const request = require("supertest");
const app = require("../src/app");
describe("Test return of api", () => {
    test("It should response with all properties", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, convert_currency_1.default)({ exchange_to: 'HKD', amount: 10 });
        expect(response).toHaveProperty('exchange_from');
        expect(response).toHaveProperty('exchange_to');
        expect(response).toHaveProperty('exchange_rate');
        expect(response).toHaveProperty('exchange_from_amount');
        expect(response).toHaveProperty('exchange_to_amount');
    }));
    test("It should response with an error message", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, convert_currency_1.default)({ exchange_to: 'HKssD', amount: 10 })).rejects.toThrow('to must have only 1 country code');
    }));
});
