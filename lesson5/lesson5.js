"use strict";
// продвинутый TS
// манипуляция с типами - в этой главе будут рассмотрены мощные инструменты для работы с TS
const key1 = 'name';
const key2 = 'age';
function getValue(obj, key) {
    return obj[key];
}
const userForObj = {
    name: 'Alex',
    age: 21
};
const userName = getValue(userForObj, 'name');
console.log(userName);
const userAge = getValue(userForObj, 'age');
console.log(userAge);
// typeof - он может не только сужать типы, но и может получать тип объекта и тд
let strOrNum;
if (Math.random() > 0.5) {
    strOrNum = 5;
}
else {
    strOrNum = 'str';
}
if (typeof strOrNum === 'string') {
    console.log(strOrNum);
}
else if (typeof strOrNum === 'number') {
    console.log(strOrNum);
}
// в данном случае typeof помогает нам переиспользовать тип из другой переменной
let strOrNumber; // string | number
const userObject = {
    name: 'Alex',
    profession: 'Development'
};
var DirectionE;
(function (DirectionE) {
    DirectionE[DirectionE["Up"] = 0] = "Up";
    DirectionE[DirectionE["Down"] = 1] = "Down";
})(DirectionE || (DirectionE = {}));
const usr = {
    name: 'Alex',
    role: [],
    permission: {
        endDate: new Date()
    }
};
const nameUser = usr['name'];
const roleNames = 'role'; // литеральная константа
const roles = ['admin', 'user', 'super_user'];
// conditional types
const something = Math.random() > 0.5 ? 1 : 0;
// const nl: NonNullableType<null> = null; // Тип "null" не может быть назначен для типа "never"
const newObj1 = {
    id: 1,
    name: 'Alex'
};
const newObj2 = {
    id: 1,
    name: 'Alex'
};
const newObj3 = {
    id: 1,
    name: 'Alex'
};
class UserClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
function getUserClass(user) {
    console.log(user);
}
getUserClass(new UserClass('Alex', 21));
getUserClass({ name: 'Alex', age: 21 });
// продолжаем
const success = {
    code: 200,
    data: 'done'
};
const error = {
    code: 500,
    data: new Error()
};
class NewUserClass {
}
class UserPersistent extends NewUserClass {
}
function getUser2(dbIdOrId) {
    if (typeof dbIdOrId === 'number') {
        return new NewUserClass();
    }
    else {
        return new UserPersistent();
    }
}
function getUser3(id) {
    if (typeof id === 'number') {
        return new NewUserClass();
    }
    else {
        return new UserPersistent();
    }
}
const resUser1 = getUser3(1);
console.log(resUser1);
const resUser2 = getUser3('1');
console.log(resUser2);
// infer оператор
function runTransaction(transaction) {
    console.log(transaction);
}
const transaction1 = {
    fromTo: ['1', '2']
};
runTransaction(transaction1);
// после использования infer
const transaction2 = {
    fromTo: ['1', '2']
};
runTransaction(transaction2);
const resp = {
    result: 'httpSuccess'
};
