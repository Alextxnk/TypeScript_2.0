// Продвинутые типы
// Union - это возможность сказать, что в той или иной переменной у нас могут находиться различные типы при различных обстоятельствах

// Сужение типов, когда нам нужно выбрать, что сделать с числом, а что со строкой
// Мы сужаем union тип до одного типа
// оно позволяет, сделав runtime проверку, применить ограничения на наш тип уже в рамках TS
function logId(id: string | number | boolean) {
   if (typeof id === 'string') {
      console.log(id); // string
   } else if (typeof id === 'number') {
      console.log(id); // number
   } else {
      console.log(id); // boolean
   }
}

logId(1);
logId('str');

function logError(err: string | string[]) {
   if (Array.isArray(err)) {
      console.log(err);
   } else {
      console.log(err);
   }
}

function logObject(obj: { a: number } | { b: number }) {
   if ('a' in obj) {
      console.log(obj.a);
   } else {
      console.log(obj.b);
   }
}

function logMultipleIds(a: string | number, b: string | boolean) {
   if (a === b) {
      console.log(a);
   } else {
      console.log(a);
   }
}

// Литеральные типы - Literal Types
enum RequestMethod {
   Get = 'GET',
   Post = 'POST'
}

const str = 'str';
const num = 1;

function fetchWithAuthEnum(url: string, method: RequestMethod) {}

function fetchWithAuthLiteral(url: string, method: 'GET' | 'POST') {}

// Type Aliases
type httpMethod = 'GET' | 'POST';

function fetchWithAuthTypeAliases(url: string, method: httpMethod) {}

type User = {
   name: string;
   age: number;
   skills: string[];
};

type Role = {
   id: number;
};

// можно так
type UserWithRole = User & Role;

// а можно и вот так
type UserWithRoles = {
   user: User;
   role: Role;
};

const newUser: UserWithRole | UserWithRoles | IUserWithRole = {
   id: 1,
   name: 'Alex',
   age: 21,
   skills: ['TS', 'React'],
   log(id) {
      return `${id}`;
   }
};

// Interfaces
interface IUser {
   name: string;
   age: number;
   skills: string[];
   log: (id: number) => string;
}

interface IRole {
   roleId: number;
}

// а можно вообще вот так
interface IUserWithRole extends IUser, IRole {
   createdAt: Date;
}

// аналогичные записи
// эта
interface IUserDictionary {
   [index: number]: IUser;
}

// и эта
type UserDictionary = {
   [index: number]: User;
};

type ud = Record<number, User>;

// Types and Interfaces
// Преимущество интерфейсов над типами:
interface IHuman {
   name: string;
}

// мы можем переопределить/доопределить наш интерфейс
interface IHuman {
   age: number;
}

// в итоге у нас один интерфейс дополняет другой,
// у нас смержатся определения/параметры с типами

// такой подход может быть не удобен во время ревью кода,
// если в разных местах будут разбросаны интерфейсы

// лучше один раз определять интерфейс

const newHuman: IHuman = {
   name: 'Alex',
   age: 21
};

// преимущество типов:
// в типах можем использовать union типы
type ID = string | number;

// в интерфейсах так не сделать

// только вот так можно сделать
interface IID {
   ID: string | number;
}

// Optional
interface INewUser {
   login: string;
   password?: string; // не обязательный (опциональный) параметр
}

function multiply(first: number, second?: number): number {
   // делаем сужение типов
   if (!second) {
      return first * first;
   }

   return first * second;
}

interface IUserPro {
   login: string;
   password?: {
      type: 'primary' | 'secondary';
   };
}

function testPass(user: IUserPro) {
   const type = user.password?.type; // опциональная цепочка
}

function test(param?: string) {
   const t = param ?? multiply(5);
}

// Задачка 3 - Запрос в виде платежа
// business entity
interface IPayment {
   sum: number;
   from: number;
   to: number;
}

enum PaymentStatus {
   SuccessStatus = 'success',
   FailedStatus = 'failed'
}

// request
interface IPaymentRequest extends IPayment {}

interface IDataSuccess extends IPayment {
   databaseId: number;
}

interface IDataFailed {
   errorMessage: string;
   errorCode: number;
}

// не самый лучший вариант - потому что у нас может быть status - success,
// а data - failed
/* interface IResponse {
   status: PaymentStatus;
   data: IDataSuccess | IDataFailed;
} */

// лучше сделать вот так:
// мы сделали Union на уровне интерфейсов, разбив на два интерфейса
// таким образом у нас не будет перекрестных вариантов
interface IResponseSuccess {
   status: PaymentStatus.SuccessStatus;
   data: IDataSuccess;
}

interface IResponseFailed {
   status: PaymentStatus.FailedStatus;
   data: IDataFailed;
}

// Void - обозначает, что функция ничего не возвращает
function log(value: string | number): void {
   console.log(value);
}

type voidFunc = () => void;

// void позволяет возвращать все что угодно, он просто будет это игнорировать

const f1: voidFunc = () => {};

const f2: voidFunc = () => {
   return true;
};

const f = f2(); // void

const skills2 = ['Dev', 'DevOps'];

const user2 = {
   s: ['Tester']
};

skills2.forEach((skill) => user2.s.push(skill));

// Unknown - означает, что мы не знаем, что у нас лежит в переменной
// Unknown более строгий чем any
let input: unknown;
input = 3;
input = ['frr', 'gre'];

// так же мы не можем переопределить тип, если присвоим значение в другую переменную или передадим ее в качетсве параметра
// let res1: string = input; // Тип "unknown" не может быть назначен для типа "string"
let res1: any = input; // можем только положить unknown в any

let input2: any;
let res2: string = input2; // тут все хорошо

// там где мы сделаем явные проверки типов у нас будет сужение типов, а остальных случаях останется unknown
function run1(i: unknown) {
   if (typeof i === 'number') {
      i++;
   } else {
      i; // unknown
   }
}

run1(input);

async function getData() {
   try {
      await fetch('');
   } catch (error) {
      // error: unknown

      // без сужения error у нас типа unknown
      // эта проверка лучше, чем код ниже
      // тут мы сужаем error до типа Error
      if (error instanceof Error) {
         console.log(error.message); // error: Error
      }
   }
}

async function getDataForce() {
   try {
      await fetch('');
   } catch (error) {
      // error: unknown

      // это плохая практика явно делать типом error, надо сначала сделать проверку
      // потому что у нас в catch приходит error типа unknown
      const err = error as Error; // err: Error
   }
}

// Union
// А тут мы берем самый широкий тип
type U1 = unknown | null; // только unknown

// Intersection
// unknown - это более широкое понятие, поэтому приводится к более узкому
type I1 = unknown & null; // только null
type I2 = unknown & string; // только string

// Never - никогда такого не произойдет
// поможет сделать код более безопасным

// функция никогда ничего не вернет
function generateError(message: string): never {
   throw new Error(message);
}

function dumpError(): never {
   while (true) {}
}

function recursion(): never {
   return recursion();
}

// const a: never = 1; // Тип "number" не может быть назначен для типа "never"
const a: void = undefined;

type PaymentAction = 'refund' | 'checkout';

function processAction(action: PaymentAction) {
   switch (action) {
      case 'refund':
         //...
         break;
      case 'checkout':
         //...
         break;
      default:
         const _: never = action; // отлавливаем ошибку на Compile Time
         throw new Error(`Unknown action${action}`);
   }
}

function isString(x: string | number): boolean {
   if (typeof x === 'string') {
      return true;
   } else if (typeof x === 'number') {
      return false;
   }

   // если мы не используем обычный else,
   // то неявно может возвращаться undefined и эту ошибку надо отработать
   generateError('error'); // never - указано явное возвращение из функции
}

// таким образом never помогает нам ограничить какие-то ветки, какие-то случаи,
// когда мы должны явно проходить проверку по типам и какую-то ветку блокировать, если мы не хотим туда попасть

// Null
const n: null = null;
// const n1: null = undefined; // Тип "undefined" не может быть назначен для типа "null"
const n2: any = null;
// const n3: number = null; // Тип "null" не может быть назначен для типа "number"
// const n4: string = null; // Тип "null" не может быть назначен для типа "string"
// const n4: boolean = null; // Тип "null" не может быть назначен для типа "boolean"
// const n5: undefined = null; // Тип "null" не может быть назначен для типа "undefined"

interface IUserNew {
   name: string;
}

function getUser() {
   if (Math.random() > 0.5) {
      return null;
   } else {
      return {
         name: 'Alex'
      } as IUserNew;
   }
}

const userItem = getUser();
const username = userItem?.name; // string | undefined

// разница null и undefined
// null - это явно заданный неопределенный объект
// undefined - говорит, что мы его не задали

// Приведение типов
let a1 = 5;
let b: string = a1.toString();

let c = '123';
let d: number = parseInt(c);

let e: string = new String(a).valueOf();
let j: boolean = new Boolean(a).valueOf();

interface IUserNew {
   email: string;
   login: string;
}

// три варианта, как можно протипизировать объект
const user11: IUserNew = {
   name: 'Alex',
   email: 'alex@gmail.com',
   login: 'Alextxnk'
};

const user12 = {
   name: 'Alex',
   email: 'alex@gmail.com',
   login: 'Alextxnk'
} as IUserNew;

// !!! вот так лучше НЕ ДЕЛАТЬ, потому что в React в jsx/tsx будет ошибка
const user13 = <IUserNew>{
   name: 'Alex',
   email: 'alex@gmail.com',
   login: 'Alextxnk'
};

// преобразование одного объекта к другому
interface Admin {
   name: string;
   role: number;
}

// вот так лучше не делать, потому что после компиляции подтянуься еще логин и email
const admin: Admin = {
   ...user11,
   role: 1
};

// Функция мапинга
function userToAdmin(user: IUserNew): Admin {
   return {
      name: user.name,
      role: 1
   };
}

// Type Guard
function newLogId(id: string | number) {
   if (newIsString(id)) {
      console.log(id);
   } else {
      console.log(id);
   }

   // Flow типов
   // id; // id: string | number
}

// пример функции с Type Guard
// она возвращает boolean
function newIsString(x: string | number): x is string {
   return typeof x === 'string';
}

function isAdmin(user: IUserNew | Admin): user is Admin {
   return 'role' in user;
}

function isAdminAlternative(user: IUserNew | Admin): user is Admin {
   return (user as Admin).role !== undefined;
}

function setRoleZero(user: IUserNew | Admin) {
   if (isAdmin(user)) {
      user.role = 0;
   } else {
      throw new Error('User is not admin');
   }
}

// Задачка 4
// см файл test4.ts
