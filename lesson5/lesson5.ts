// продвинутый TS
// манипуляция с типами - в этой главе будут рассмотрены мощные инструменты для работы с TS

// оператор над типами keyof  - позволяет нам вытащить ключи из класса, интерфейса или объекта

interface IForUser {
   name: string;
   age: number;
}

type KeysOfUser = keyof IForUser;

const key1: KeysOfUser = 'name';
const key2: KeysOfUser = 'age';

function getValue<T, K extends keyof T>(obj: T, key: K) {
   return obj[key];
}

const userForObj: IForUser = {
   name: 'Alex',
   age: 21
};

const userName = getValue(userForObj, 'name');
console.log(userName);

const userAge = getValue(userForObj, 'age');
console.log(userAge);

// typeof - он может не только сужать типы, но и может получать тип объекта и тд
let strOrNum: string | number;

if (Math.random() > 0.5) {
   strOrNum = 5;
} else {
   strOrNum = 'str';
}

if (typeof strOrNum === 'string') {
   console.log(strOrNum);
} else if (typeof strOrNum === 'number') {
   console.log(strOrNum);
}

// в данном случае typeof помогает нам переиспользовать тип из другой переменной
let strOrNumber: typeof strOrNum; // string | number

const userObject = {
   name: 'Alex',
   profession: 'Development'
};

type keyOfUserObj = keyof typeof userObject; // "name" | "profession"

enum DirectionE {
   Up,
   Down
}

type direction = keyof typeof DirectionE; // "Up" | "Down"

// indexed access types - обращение по индексу в типах
interface IRole {
   name: string;
}

interface Permission {
   endDate: Date;
}

interface IUsr {
   name: string;
   role: IRole[];
   permission: Permission;
}

const usr: IUsr = {
   name: 'Alex',
   role: [],
   permission: {
      endDate: new Date()
   }
};

const nameUser = usr['name'];
const roleNames = 'role'; // литеральная константа

type roleTypes = IUsr['role'];
type roleTypes2 = IUsr[typeof roleNames];

type roleType = IUsr['role'][number];

const roles = ['admin', 'user', 'super_user'] as const;
type rolesType = (typeof roles)[number];

type dateType = IUsr['permission']['endDate'];

// conditional types
const something: number = Math.random() > 0.5 ? 1 : 0;

interface IHttpResp<T extends 'success' | 'failed'> {
   code: number;
   data: T extends 'success' ? string : Error;
   // data2: T extends 'success' ? string : number;
}

// задачки
type NonNullableType<T = string> = T extends null | undefined ? never : T;
// const nl: NonNullableType<null> = null; // Тип "null" не может быть назначен для типа "never"

const newObj1: Record<string, number | string> = {
   id: 1,
   name: 'Alex'
};

type OwnRecord<T extends string | number | symbol, Y> = { [key in T]: Y };

const newObj2: OwnRecord<string, number | string> = {
   id: 1,
   name: 'Alex'
};

const newObj3: { [key in string | number | symbol]: number | string } = {
   id: 1,
   name: 'Alex'
};

class UserClass {
   constructor(public name: string, public age: number) {}
}

function getUserClass(user: UserClass) {
   console.log(user);
}

getUserClass(new UserClass('Alex', 21));
getUserClass({ name: 'Alex', age: 21 });

// продолжаем
const success: IHttpResp<'success'> = {
   code: 200,
   data: 'done'
};

const error: IHttpResp<'failed'> = {
   code: 500,
   data: new Error()
};

class NewUserClass {
   id: number;
   name: string;
}

class UserPersistent extends NewUserClass {
   dbId: string;
}

// делаем перегрузки
function getUser2(id: number): NewUserClass;
function getUser2(dbId: string): UserPersistent;
function getUser2(dbIdOrId: string | number): NewUserClass | UserPersistent {
   if (typeof dbIdOrId === 'number') {
      return new NewUserClass();
   } else {
      return new UserPersistent();
   }
}

type UserOrUserPersistent<T extends string | number> = T extends number
   ? NewUserClass
   : UserPersistent;

function getUser3<T extends string | number>(id: T): UserOrUserPersistent<T> {
   if (typeof id === 'number') {
      return new NewUserClass() as UserOrUserPersistent<T>;
   } else {
      return new UserPersistent() as UserOrUserPersistent<T>;
   }
}

const resUser1 = getUser3(1);
console.log(resUser1);
const resUser2 = getUser3('1');
console.log(resUser2);

// infer оператор
function runTransaction(transaction: { fromTo: [string, string] }) {
   console.log(transaction);
}

const transaction1 = {
   fromTo: ['1', '2'] as [string, string]
};

runTransaction(transaction1);

// после использования infer
const transaction2: GetFirstArg<typeof runTransaction> = {
   fromTo: ['1', '2']
};

runTransaction(transaction2);

// infer вытаскивает нужный нам тип и после этого мы можем этот тип переиспользовать
type GetFirstArg<T> = T extends (first: infer First, ...args: any[]) => any
   ? First
   : never;

type Modifier = 'crete' | 'read' | 'update' | 'delete';

// mapped types
type UserRoles = {
   customers?: Modifier;
   projects?: Modifier;
   adminPanel?: Modifier;
};

// вот так он будет выглядеть
// -? - все свойства становятся обязательными
// +? - все свойства становятся НЕобязательными
// Exclude - делает фильтр - убираем элемент из второго аргумента Exclude
type ModifierToAccess<Type> = {
   +readonly [Property in keyof Type as Exclude<`canAccess${string & Property}`, 'canAccessadminPanel'>]-?: boolean;
};

type UserAccess1 = { 
   customers?: boolean; 
   projects?: boolean;
   adminPanel?: boolean;
};

// получили то же самое, что и в UserAccess1
type UserAccess2 = ModifierToAccess<UserRoles>;
