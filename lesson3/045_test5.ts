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
   constructor(public id: number, public title: string, public price: number) {}
}

class Delivery {
   constructor(public date: Date) {}
}

class HomeDelivery extends Delivery {
   constructor(date: Date, public address: string) {
      super(date);
   }
}

class ShopDelivery extends Delivery {
   constructor(public shopId: number) {
      super(new Date());
   }
}

type DeliveryOptions = HomeDelivery | ShopDelivery;

class Cart {
   private products: Product[] = [];
   private delivery: DeliveryOptions;

   public addProduct(product: Product): void {
      this.products.push(product);
   }

   public deleteProduct(productId: number): void {
      this.products = this.products.filter((p: Product) => p.id !== productId);
   }

   public getSum(): number {
      return this.products
         .map((p: Product) => p.price)
         .reduce((p1: number, p2: number) => p1 + p2);
   }

   public setDelivery(delivery: DeliveryOptions): void {
      this.delivery = delivery;
   }

   public checkout() {
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
