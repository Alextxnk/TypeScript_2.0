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
