import Coupon from "../src/Coupon";

test("Deve criar um cupom de desconto válido", function () {
    const coupon = new Coupon("VALE2O", 20, new Date("2022-12-10"));
    const today = new Date("2022-12-01");
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
});

test("Deve criar um cupom de desconto expirado", function () {
    const coupon = new Coupon("VALE2O", 20, new Date("2022-03-01"));
    const today = new Date("2022-12-01");
    const isExpired = coupon.isExpired();
    expect(isExpired).toBeTruthy();
});

test("Deve criar um cupom válido e calcular o desconto", function () {
    const coupon = new Coupon("VALE2O", 20);
    const today = new Date("2022-01-05");
    const amount = coupon.calculateDiscount(1000);
    expect(amount).toBe(200);
});