import { isTemplateExpression } from "typescript";
import Coupon from "../../src/domain/entity/Coupon";
import DefaultFreightCalculator from "../../src/domain/entity/DefaultFreightCalculator";
import FixedFreightCalculator from "../../src/domain/entity/FixedFreightCalculator";
import Item from "../../src/domain/entity/Item";
import Order from "../../src/domain/entity/Order";

test("Dever criar um pedido com CPF v�lido", function(){
    const cpf = "839.435.452-10";
    const order = new Order(cpf);
    const total = order.getTotal();
    expect(total).toBe(0);
});

test("Dever tentar criar um pedido vazio com CPF inv�lido", function(){
    const cpf = "111.111.111-11";
    expect(() => new Order(cpf)).toThrow(new Error("Invalid cpf"));
});
test("Dever criar um pedido com 3 itens", function(){
    const cpf = "839.435.452-10";
    const order = new Order(cpf);
    order.addItem(new Item(1, "M�sica", "CD", 30), 3);
    order.addItem(new Item(2, "V�deo", "DVD", 50), 1);
    order.addItem(new Item(3, "V�deo", "VHS", 10), 2);
    const total = order.getTotal();
    expect(total).toBe(160);
});

test("Dever criar um pedido com 3 itens com um cupom de desconto", function(){
    const cpf = "839.435.452-10";
    const order = new Order(cpf);
    order.addItem(new Item(1, "M�sica", "CD", 30), 3);
    order.addItem(new Item(2, "V�deo", "DVD", 50), 1);
    order.addItem(new Item(3, "V�deo", "VHS", 10), 2);
    order.addCoupon(new Coupon("VALE20", 20));

    const total = order.getTotal();
    expect(total).toBe(128);
});

test("Dever criar um pedido com 3 itens com um cupom de desconto expirado", function(){  
    const cpf = "839.435.452-10";
    const order = new Order(cpf, new Date("2021-12-10"));
    order.addItem(new Item(1, "M�sica", "CD", 30), 3);
    order.addItem(new Item(2, "V�deo", "DVD", 50), 1);
    order.addItem(new Item(3, "V�deo", "VHS", 10), 2);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2021-12-01")));

    const total = order.getTotal();
    expect(total).toBe(160);
}); 

test("Dever criar um pedido com 3 itens com o c�lculo do frete com a estrat�gia default", function(){
    const cpf = "839.435.452-10";
    const order = new Order(cpf, new Date(), new DefaultFreightCalculator());
    order.addItem(new Item(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item(5, "Instrumentos Musicais", "Amplificador", 5000, 100, 50 ,50 ,20), 1);
    order.addItem(new Item(6, "Acess�rios", "Cabo", 30, 10, 10, 10, 0.9), 3);

    const freight = order.getFreight();
    expect(freight).toBe(260);
});

test("Dever criar um pedido com 3 itens com o c�lculo do frete com a estrat�gia fixo", function(){
    const cpf = "839.435.452-10";
    const order = new Order(cpf, new Date(), new FixedFreightCalculator());
    order.addItem(new Item(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item(5, "Instrumentos Musicais", "Amplificador", 5000, 100, 50 ,50 ,20), 1);
    order.addItem(new Item(6, "Acess�rios", "Cabo", 30, 10, 10, 10, 0.9), 3);

    const freight = order.getFreight();
    expect(freight).toBe(50);
});