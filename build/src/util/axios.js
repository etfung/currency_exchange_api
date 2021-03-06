"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const api = axios_1.default.create({
    baseURL: process.env.EXCHANGE_RATE_BASE_URL,
});
exports.default = api;
