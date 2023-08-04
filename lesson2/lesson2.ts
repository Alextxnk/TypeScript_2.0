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
function run(i: unknown) {
   if (typeof i === 'number') {
      i++;
   } else {
      i; // unknown
   }
}

run(input);

async function getData() {
   try {
      await fetch('');
   } catch (error) {
      // без сужения error у нас типа unknown
      if (error instanceof Error) {
         console.log(error.message);
      }
   }
}
