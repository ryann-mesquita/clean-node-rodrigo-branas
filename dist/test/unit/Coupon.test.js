"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("../../src/domain/entity/Coupon"));
test("Deve criar um cupom de desconto v�lido", function () {
    const coupon = new Coupon_1.default("VALE2O", 20, new Date("2022-12-10"));
    const today = new Date("2022-12-01");
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
});
test("Deve criar um cupom de desconto expirado", function () {
    const coupon = new Coupon_1.default("VALE2O", 20, new Date("2022-03-01"));
    const today = new Date("2022-12-01");
    const isExpired = coupon.isExpired();
    expect(isExpired).toBeTruthy();
});
test("Deve criar um cupom v�lido e calcular o desconto", function () {
    const coupon = new Coupon_1.default("VALE2O", 20);
    const today = new Date("2022-01-05");
    const amount = coupon.calculateDiscount(1000);
    expect(amount).toBe(200);
});
