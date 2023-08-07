"use strict";
// Классы
// JS и TS - мультипарадигменные ЯП, мы можем писать как в функциональном программировании, так и в ООП стиле
// TS похож на C# т.к. у него один автор
// приниципы ООП:
// 1. Абстракция - когда мы скрываем какие-то части нашей реализации или наоборот не дополняем наш объект для того,
// чтобы абстрагироваться от реального объекта,
// также можем скрывать какие-то методы реализации, предоставляя наверх другим пользователям нашего компонента
// только определенные наборы методов
// 2. Инкапсуляция - это механизм размещения не только данных внутри нашего класса, но и методов работы с ним
// 3. Наследование
// 4. Полиморфизм - когда мы имеем возможность по одному интерфейсу делать множество абстракций,
// написать множество реализаций одного интерфейса
class CUser {
    constructor(ageOrName) {
        if (typeof ageOrName === 'string') {
            this.name = ageOrName;
        }
        else if (typeof ageOrName === 'number') {
            this.age = ageOrName;
        }
    }
}
// делаем инстанс пользователя
const user1 = new CUser('Alex');
console.log(user1);
user1.name = 'Dima';
console.log(user1);
class Admin {
}
const admin1 = new Admin();
admin1.role = 1;
// методы класса
// метод - это функция внутри класса, которая выполняет какие-то действия
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus[PaymentStatus["Holded"] = 0] = "Holded";
    PaymentStatus[PaymentStatus["Processed"] = 1] = "Processed";
    PaymentStatus[PaymentStatus["Reversed"] = 2] = "Reversed";
})(PaymentStatus || (PaymentStatus = {}));
class Payment {
    constructor(id) {
        this.id = id;
        this.createdAt = new Date();
        this.status = PaymentStatus.Holded;
    }
    getPaymentLifeTime() {
        return new Date().getTime() - this.createdAt.getTime();
    }
    unholdPayment() {
        if (this.status === PaymentStatus.Processed) {
            throw new Error('Платеж не может быть возвращен');
        }
        this.status = PaymentStatus.Reversed;
        this.updatedAt = new Date();
    }
}
const payment = new Payment(1);
payment.unholdPayment();
console.log(payment);
const time = payment.getPaymentLifeTime();
console.log(time);
