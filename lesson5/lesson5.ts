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
   data2: T extends 'success' ? string : number;
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
