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
        this.status = PaymentStatus.Holded;
        this.createdAt = new Date();
        this.id = id;
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
// продолжим с перегрузкой методов
class User2 {
    addSkill(skillOrSkills) {
        if (typeof skillOrSkills === 'string') {
            this.skills.push(skillOrSkills);
        }
        else {
            this.skills.concat(skillOrSkills);
        }
    }
}
function run(distance) {
    if (typeof distance === 'number') {
        return 1;
    }
    else {
        return 'distance';
    }
}
// геттеры и сеттеры - позволяют нам переопределить, то как будет присваиваться или получаться свойство нашего объекта
// они позволяют дополнить логику полчения и присвоения свойства в нашем объекте
// при этом у них есть некоторые ограничения, если не указывать явно их типы, то могут возникнуть проблемы
// еще геттеры и сеттеры не могут быть асинхронными
// обычные методы могут быть асинхронными
class UserAuth {
    set setLogin(login) {
        this.login = 'user-' + login;
        this.createdAt = new Date();
    }
    get getLogin() {
        return this.login;
    }
}
const userAuth = new UserAuth();
userAuth.setLogin = 'login';
console.log(userAuth); // UserAuth { login: 'user-login' }
console.log(userAuth.getLogin); // user-login
class Logger {
    log(...args) {
        console.log(...args);
    }
    error(...args) {
        console.log(...args);
    }
}
// имплементируемый тип всегда должен быть шире типа в интерфейсе
// класс может имплементировать множество интерфейсов
class Payable {
    log(...args) {
        throw new Error('Method not implemented.');
    }
    error(...args) {
        throw new Error('Method not implemented.');
    }
    pay(paymentId) {
        //
    }
}
class CPayment {
    constructor(id) {
        this.status = 'new';
        this.id = id;
    }
    pay() {
        this.status = 'paid';
    }
}
class PersistedPayment extends CPayment {
    constructor() {
        const id = Math.random();
        // super нужен, если мы переопределяем конструктор
        super(id);
    }
    save() {
        //
    }
    // override method - переопределение метода
    pay(date) {
        super.pay();
        if (date) {
            this.paiedAt = date;
        }
    }
}
// особенности наследования
class User4 {
    constructor() {
        this.name = 'user';
        console.log('user4 name:', this.name);
    }
}
class Admin4 extends User4 {
    constructor() {
        super();
        this.name = 'admin';
        console.log('admin4 name:', this.name);
    }
}
new Admin4();
class HttpError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code !== null && code !== void 0 ? code : 500;
    }
}
// Композиция против наследования
class User5 {
    constructor(name) {
        this.name = name;
    }
}
class Users extends Array {
    searchByName(name) {
        return this.filter((u) => u.name === name);
    }
    toString() {
        return this.map((u) => u.name).join(', ');
    }
}
const users = new Users();
users.push(new User5('Alex'));
users.push(new User5('Dima'));
console.log(users.toString());
