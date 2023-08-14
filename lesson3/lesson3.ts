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
   name: string;
   age: number;

   // overload - перегрузка
   // три перегрузки
   constructor();
   constructor(name: string);
   constructor(age: number);

   constructor(ageOrName?: string | number) {
      if (typeof ageOrName === 'string') {
         this.name = ageOrName;
      } else if (typeof ageOrName === 'number') {
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
   role: number;
}

const admin1 = new Admin();
admin1.role = 1;

// методы класса
// метод - это функция внутри класса, которая выполняет какие-то действия
enum PaymentStatus {
   Holded,
   Processed,
   Reversed
}

class Payment {
   id: number;
   status: PaymentStatus = PaymentStatus.Holded;
   createdAt: Date = new Date();
   updatedAt: Date;

   constructor(id: number) {
      this.id = id;
   }

   getPaymentLifeTime(): number {
      return new Date().getTime() - this.createdAt.getTime();
   }

   unholdPayment(): void {
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
   skills: string[];

   addSkill(skill: string): void;
   addSkill(skill: string[]): void;
   addSkill(skillOrSkills: string | string[]): void {
      if (typeof skillOrSkills === 'string') {
         this.skills.push(skillOrSkills);
      } else {
         this.skills.concat(skillOrSkills);
      }
   }
}

function run(distance: string): string;
function run(distance: number): number;
function run(distance: number | string): number | string {
   if (typeof distance === 'number') {
      return 1;
   } else {
      return 'distance';
   }
}

// геттеры и сеттеры - позволяют нам переопределить, то как будет присваиваться или получаться свойство нашего объекта
// они позволяют дополнить логику получения и присвоения свойства в нашем объекте
// при этом у них есть некоторые ограничения, если не указывать явно их типы, то могут возникнуть проблемы
// еще геттеры и сеттеры не могут быть асинхронными

// обычные методы могут быть асинхронными
class UserAuth {
   login: string;
   password: string;
   createdAt: Date;

   set setLogin(login: string) {
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

// implements - реализация - имплементация классом интерфейса
interface ILogger {
   log(...args: string[]): void;
   error(...args: string[]): void;
}

class Logger implements ILogger {
   log(...args: string[]): void {
      console.log(...args);
   }
   error(...args: string[]): void {
      console.log(...args);
   }
}

interface IPayable {
   pay(paymentId: number): void;
   price?: number;
}

// имплементируемый тип всегда должен быть шире типа в интерфейсе
// класс может имплементировать множество интерфейсов
class Payable implements IPayable, ILogger {
   log(...args: string[]): void {
      throw new Error('Method not implemented.');
   }
   error(...args: string[]): void {
      throw new Error('Method not implemented.');
   }
   pay(paymentId: number | string): void {
      //
   }
   price?: number | undefined;
}

// extends - наследование
type NewPaymentStatus = 'new' | 'paid';

class CPayment {
   id: number;
   status: NewPaymentStatus = 'new';

   constructor(id: number) {
      this.id = id;
   }

   pay() {
      this.status = 'paid';
   }
}

class PersistedPayment extends CPayment {
   databaseId: number;
   paiedAt: Date;

   constructor() {
      const id = Math.random();

      // super нужен, если мы переопределяем конструктор
      super(id);
   }

   save() {
      //
   }

   // override method - переопределение метода
   override pay(date?: Date) {
      super.pay();

      if (date) {
         this.paiedAt = date;
      }
   }
}

// особенности наследования
class User4 {
   name: string = 'user';

   constructor() {
      console.log('user4 name:', this.name);
   }
}

class Admin4 extends User4 {
   name: string = 'admin';

   constructor() {
      super();
      console.log('admin4 name:', this.name);
   }
}

new Admin4();

class HttpError extends Error {
   code: number;

   constructor(message: string, code?: number) {
      super(message);
      this.code = code ?? 500;
   }
}

// Композиция против наследования
class User5 {
   name: string;

   constructor(name: string) {
      this.name = name;
   }
}

// вот это у нас наследование
// здесь мы тянем все методы из Array
class Users extends Array<User5> {
   searchByName(name: string) {
      return this.filter((u) => u.name === name);
   }

   override toString(): string {
      return this.map((u) => u.name).join(', ');
   }
}

const users = new Users();
users.push(new User5('Alex'));
users.push(new User5('Dima'));
console.log(users.toString());

// а это композиция
class UserList {
   users: User[];

   push(u: User) {
      this.users.push(u);
   }
}

// DDD
class UserPayment {
   date: Date;
}

class UserWithPayment extends UserPayment {
   name: string;
}

// а лучше сделать композицию из user и payment
class UserWithPayment2 {
   user: User5;
   payment: UserPayment;

   constructor(user: User5, payment: UserPayment) {
      this.payment = payment;
      this.user = user;
   }
}

// видимость свойств и методов класса
// приватные свойства недоступны извне, а доступны исключително внутри класса
class Vehicle {
   public brand: string;
   private damages: string[];
   private model: string;
   protected run: number;
   #price: number; // private в js стиле

   set setModel(model: string) {
      this.model = model;
      this.#price = 100;
   }

   get getModel() {
      return this.model;
   }

   // проверяем эквивалентность двух свойств
   isPriceEqual(v: Vehicle) {
      return this.#price === v.#price;
   }

   addDamage(damage: string) {
      this.damages.push(damage);
   }
}

// чтобы обратиться к private полям, нужно использовать геттеры и сеттеры
// к proteced полям также нельзя обратиться извне, только в дочернем классе

new Vehicle().brand = 'BMW';

// private поля и методы класса не наследуются
class EvroTruck extends Vehicle {
   // proteced поля наследуются и мы можем обратиться к ним в дочернем классе
   setRun(km: number) {
      this.run = km / 0.62;
   }
}

// статические свойства
// в TS нет статичных классов, можно только делать статические поля и методы
class UserService {
   static db: any;
   // static name: string; // Статическое свойство "name" конфликтует со встроенным свойством "Function.name" функции-конструктора "UserService"

   // можем делать статические методы асинхронными
   static async getUser(id: number) {
      // return UserService.db.findById(id);
   }

   constructor(public id: number) {}

   create() {
      UserService.db;
   }

   static {
      UserService.db = 'str';
   }
}

// мы можем обращаться к полям, как к cвойствам объекта
// без инстанцирования
UserService.getUser(1);

// при инстанциировании мы теряем доступ к статическим полям и методам
const instance = new UserService(1);
instance.create();

// работа с this
// this ссылается на контекст текущего объекта
class PaymentClass {
   private date: Date = new Date();

   // явная проверка контекста
   getDate(this: PaymentClass) {
      return this.date;
   }

   // чтобы не терялся контекст, мы можем использовать стрелочную функцию
   // используется контекст уровня выше
   getDateArrow = () => {
      return this.date;
   };
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
   name: string;

   setName(name: string): this {
      this.name = name;
      return this;
   }

   // TypeGuard
   isAdmin(): this is AdminBuilder {
      return this instanceof AdminBuilder;
   }
}

class AdminBuilder extends UserBuilder {
   roles: string[];
}

const resUs = new UserBuilder().setName('Alex user');
const resAd = new AdminBuilder().setName('Alex admin');

// еще с помощью this можем делать TypeGuard - он помогает нам ограничить поток выполнения
// и в тех или иных ветках получать какой-то определенный тип

let userB: UserBuilder | AdminBuilder = new UserBuilder();

if (userB.isAdmin()) {
   console.log('userB if', userB);
} else {
   console.log('userB else', userB);
}

// абстрактные классы
// abstract - модификатор класса

// отличие абстрактного класса от интерфейса в том, что мы можем в абстрактом классе реализовывать какой-то функционал
// и в классе наследнике мы уже получаем весь этот функционал
abstract class Controller {
   abstract handle(req: any): void;

   // нам не обязательно делать абстрактные методы внутри этого класса 
   handleWithLogs(req: any): void {
      console.log('start');
      // также мы можем внутри этого класса вызывать абстрактные методы
      this.handle(req);
      console.log('end');
   }
}

// мы не можем создавать экземпляры абстрактных классов (не можем инстациировать их)
// new Controller() - error

class UserController extends Controller {
   handle(req: any): void {
      console.log(req);
   }
}

// и уже класс наследник мы можем инстациировать
const userContr = new UserController();
userContr.handleWithLogs('req'); // можем вызвать родительский метод 
