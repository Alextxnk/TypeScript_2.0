"use strict";
// Классы
// JS и TS - мультипарадигменные ЯП, мы можем писать как в функциональном программировании, так и в ООП стиле
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Vehicle_price;
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
// вот это у нас наследование
// здесь мы тянем все методы из Array
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
// а это композиция
class UserList {
    push(u) {
        this.users.push(u);
    }
}
// DDD
class UserPayment {
}
class UserWithPayment extends UserPayment {
}
// а лучше сделать композицию из user и payment
class UserWithPayment2 {
    constructor(user, payment) {
        this.payment = payment;
        this.user = user;
    }
}
// видимость свойств и методов класса
// приватные свойства недоступны извне, а доступны исключително внутри класса
class Vehicle {
    constructor() {
        _Vehicle_price.set(this, void 0); // private в js стиле
    }
    set setModel(model) {
        this.model = model;
        __classPrivateFieldSet(this, _Vehicle_price, 100, "f");
    }
    get getModel() {
        return this.model;
    }
    // проверяем эквивалентность двух свойств
    isPriceEqual(v) {
        return __classPrivateFieldGet(this, _Vehicle_price, "f") === __classPrivateFieldGet(v, _Vehicle_price, "f");
    }
    addDamage(damage) {
        this.damages.push(damage);
    }
}
_Vehicle_price = new WeakMap();
// чтобы обратиться к private полям, нужно использовать геттеры и сеттеры
// к proteced полям также нельзя обратиться извне, только в дочернем классе
new Vehicle().brand = 'BMW';
// private поля и методы класса не наследуются
class EvroTruck extends Vehicle {
    // proteced поля наследуются и мы можем обратиться к ним в дочернем классе
    setRun(km) {
        this.run = km / 0.62;
    }
}
// статические свойства
// в TS нет статичных классов, можно только делать статические поля и методы
class UserService {
    // static name: string; // Статическое свойство "name" конфликтует со встроенным свойством "Function.name" функции-конструктора "UserService"
    // можем делать статические методы асинхронными
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // return UserService.db.findById(id);
        });
    }
    constructor(id) {
        this.id = id;
    }
    create() {
        UserService.db;
    }
}
(() => {
    UserService.db = 'str';
})();
// мы можем обращаться к полям, как к cвойствам объекта
// без инстанцирования
UserService.getUser(1);
// при инстанциировании мы теряем доступ к статическим полям и методам
const instance = new UserService(1);
instance.create();
// работа с this
// this ссылается на контекст текущего объекта
class PaymentClass {
    constructor() {
        this.date = new Date();
        // чтобы не терялся контекст, мы можем использовать стрелочную функцию
        // используется контекст уровня выше
        this.getDateArrow = () => {
            return this.date;
        };
    }
    // явная проверка контекста
    getDate() {
        return this.date;
    }
}
const p = new PaymentClass();
console.log('payment date:', p.getDate());
const userObj = {
    id: 1,
    // paymentDate: p.getDate,
    paymentDate: p.getDate.bind(p),
    paymentDateArrow: p.getDateArrow
};
// потеряли контекст
// после bind привязали контекст
console.log('paymentDate', userObj.paymentDate()); // undefined
console.log('paymentDateArrow', userObj.paymentDateArrow());
class PaymentPersistent extends PaymentClass {
    save() {
        return super.getDate(); // все ок
    }
    saveArrow() {
        // return super.getDateArrow(); // получаем ошибку в runtime
        return this.getDateArrow(); // все ок
    }
}
const persistent = new PaymentPersistent();
console.log('persistent', persistent.save());
console.log('persistentArrow', persistent.saveArrow());
// типизация this
class UserBuilder {
    setName(name) {
        this.name = name;
        return this;
    }
    // TypeGuard
    isAdmin() {
        return this instanceof AdminBuilder;
    }
}
class AdminBuilder extends UserBuilder {
}
const resUs = new UserBuilder().setName('Alex user');
const resAd = new AdminBuilder().setName('Alex admin');
// еще с помощью this можем делать TypeGuard - он помогает нам ограничить поток выполнения
// и в тех или иных ветках получать какой-то определенный тип
let userB = new UserBuilder();
if (userB.isAdmin()) {
    console.log('userB if', userB);
}
else {
    console.log('userB else', userB);
}
// абстрактные классы
// abstract - модификатор класса
// отличие абстрактного класса от интерфейса в том, что мы можем в абстрактом классе реализовывать какой-то функционал
// и в классе наследнике мы уже получаем весь этот функционал
class Controller {
    // нам не обязательно делать абстрактные методы внутри этого класса 
    handleWithLogs(req) {
        console.log('start');
        // также мы можем внутри этого класса вызывать абстрактные методы
        this.handle(req);
        console.log('end');
    }
}
// мы не можем создавать экземпляры абстрактных классов (не можем инстациировать их)
// new Controller() - error
class UserController extends Controller {
    handle(req) {
        console.log(req);
    }
}
// и уже класс наследник мы можем инстациировать
const userContr = new UserController();
userContr.handleWithLogs('req'); // можем вызвать родительский метод 
