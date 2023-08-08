"use strict";
/**
Необходимо сделать корзину (Cart) на сайте,
которая имееет список продуктов (Product), добавленных в корзину
и параметры доставки (Delivery). Для Cart реализовать методы:
-  Добавить продукт в корзину
-  Удалить продукт из корзины по ID
-  Посчитать стоимость товаров в корзине
-  Задать доставку
-  Checkout - вернуть что всё ок, если есть продукты и параметры доставки
   Product: id, название и цена
   Delivery: может быть как до дома (дата и адрес) или до пункта выдачи (дата = Сегодня и Id магазина)
*/
class Product {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}
class Delivery {
    constructor(date) {
        this.date = date;
    }
}
class HomeDelivery extends Delivery {
    constructor(date, address) {
        super(date);
        this.address = address;
    }
}
class ShopDelivery extends Delivery {
    constructor(shopId) {
        super(new Date());
        this.shopId = shopId;
    }
}
class Cart {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    deleteProduct(productId) {
        this.products = this.products.filter((p) => p.id !== productId);
    }
    getSum() {
        return this.products
            .map((p) => p.price)
            .reduce((p1, p2) => p1 + p2);
    }
    setDelivery(delivery) {
        this.delivery = delivery;
    }
    checkout() {
        if (this.products.length === 0) {
            throw new Error('No products!');
        }
        if (!this.delivery) {
            throw new Error('No delivery!');
        }
        return { success: true };
    }
}
const cart = new Cart();
cart.addProduct(new Product(1, 'Cake', 500));
cart.addProduct(new Product(2, 'Chocolate', 150));
cart.addProduct(new Product(3, 'Milk', 55));
cart.deleteProduct(2);
cart.setDelivery(new HomeDelivery(new Date(), 'Gagarina 1'));
console.log('sum:', cart.getSum());
console.log(cart);
