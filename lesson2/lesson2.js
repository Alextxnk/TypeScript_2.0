"use strict";
// Продвинутые типы
// Union - это возможность сказать, что в той или иной переменной у нас могут находиться различные типы при различных обстоятельствах
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Сужение типов, когда нам нужно выбрать, что сделать с числом, а что со строкой
// Мы сужаем union тип до одного типа
// оно позволяет, сделав runtime проверку, применить ограничения на наш тип уже в рамках TS
function logId(id) {
    if (typeof id === 'string') {
        console.log(id); // string
    }
    else if (typeof id === 'number') {
        console.log(id); // number
    }
    else {
        console.log(id); // boolean
    }
}
logId(1);
logId('str');
function logError(err) {
    if (Array.isArray(err)) {
        console.log(err);
    }
    else {
        console.log(err);
    }
}
function logObject(obj) {
    if ('a' in obj) {
        console.log(obj.a);
    }
    else {
        console.log(obj.b);
    }
}
function logMultipleIds(a, b) {
    if (a === b) {
        console.log(a);
    }
    else {
        console.log(a);
    }
}
// Литеральные типы - Literal Types
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["Get"] = "GET";
    RequestMethod["Post"] = "POST";
})(RequestMethod || (RequestMethod = {}));
const str = 'str';
const num = 1;
function fetchWithAuthEnum(url, method) { }
function fetchWithAuthLiteral(url, method) { }
function fetchWithAuthTypeAliases(url, method) { }
const newUser = {
    id: 1,
    name: 'Alex',
    age: 21,
    skills: ['TS', 'React'],
    log(id) {
        return `${id}`;
    }
};
// в итоге у нас один интерфейс дополняет другой,
// у нас смержатся определения/параметры с типами
// такой подход может быть не удобен во время ревью кода,
// если в разных местах будут разбросаны интерфейсы
// лучше один раз определять интерфейс
const newHuman = {
    name: 'Alex',
    age: 21
};
function multiply(first, second) {
    // делаем сужение типов
    if (!second) {
        return first * first;
    }
    return first * second;
}
function testPass(user) {
    var _a;
    const type = (_a = user.password) === null || _a === void 0 ? void 0 : _a.type; // опциональная цепочка
}
function test(param) {
    const t = param !== null && param !== void 0 ? param : multiply(5);
}
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["SuccessStatus"] = "success";
    PaymentStatus["FailedStatus"] = "failed";
})(PaymentStatus || (PaymentStatus = {}));
// Void - обозначает, что функция ничего не возвращает
function log(value) {
    console.log(value);
}
// void позволяет возвращать все что угодно, он просто будет это игнорировать
const f1 = () => { };
const f2 = () => {
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
let input;
input = 3;
input = ['frr', 'gre'];
// так же мы не можем переопределить тип, если присвоим значение в другую переменную или передадим ее в качетсве параметра
// let res1: string = input; // Тип "unknown" не может быть назначен для типа "string"
let res1 = input; // можем только положить unknown в any
let input2;
let res2 = input2; // тут все хорошо
// там где мы сделаем явные проверки типов у нас будет сужение типов, а остальных случаях останется unknown
function run1(i) {
    if (typeof i === 'number') {
        i++;
    }
    else {
        i; // unknown
    }
}
run1(input);
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch('');
        }
        catch (error) {
            // error: unknown
            // без сужения error у нас типа unknown
            // эта проверка лучше, чем код ниже
            // тут мы сужаем error до типа Error
            if (error instanceof Error) {
                console.log(error.message); // error: Error
            }
        }
    });
}
function getDataForce() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch('');
        }
        catch (error) {
            // error: unknown
            // это плохая практика явно делать типом error, надо сначала сделать проверку
            // потому что у нас в catch приходит error типа unknown
            const err = error; // err: Error
        }
    });
}
// Never - никогда такого не произойдет
// поможет сделать код более безопасным
// функция никогда ничего не вернет
function generateError(message) {
    throw new Error(message);
}
function dumpError() {
    while (true) { }
}
function recursion() {
    return recursion();
}
// const a: never = 1; // Тип "number" не может быть назначен для типа "never"
const a = undefined;
function processAction(action) {
    switch (action) {
        case 'refund':
            //...
            break;
        case 'checkout':
            //...
            break;
        default:
            const _ = action; // отлавливаем ошибку на Compile Time
            throw new Error(`Unknown action${action}`);
    }
}
function isString(x) {
    if (typeof x === 'string') {
        return true;
    }
    else if (typeof x === 'number') {
        return false;
    }
    // если мы не используем обычный else,
    // то неявно может возвращаться undefined и эту ошибку надо отработать
    generateError('error'); // never - указано явное возвращение из функции
}
// таким образом never помогает нам ограничить какие-то ветки, какие-то случаи,
// когда мы должны явно проходить проверку по типам и какую-то ветку блокировать, если мы не хотим туда попасть
// Null
const n = null;
// const n1: null = undefined; // Тип "undefined" не может быть назначен для типа "null"
const n2 = null;
function getUser() {
    if (Math.random() > 0.5) {
        return null;
    }
    else {
        return {
            name: 'Alex'
        };
    }
}
const userItem = getUser();
const username = userItem === null || userItem === void 0 ? void 0 : userItem.name; // string | undefined
// разница null и undefined
// null - это явно заданный неопределенный объект
// undefined - говорит, что мы его не задали
// Приведение типов
let a1 = 5;
let b = a1.toString();
let c = '123';
let d = parseInt(c);
let e = new String(a).valueOf();
let j = new Boolean(a).valueOf();
// три варианта, как можно протипизировать объект
const user11 = {
    name: 'Alex',
    email: 'alex@gmail.com',
    login: 'Alextxnk'
};
const user12 = {
    name: 'Alex',
    email: 'alex@gmail.com',
    login: 'Alextxnk'
};
// !!! вот так лучше НЕ ДЕЛАТЬ, потому что в React в jsx/tsx будет ошибка
const user13 = {
    name: 'Alex',
    email: 'alex@gmail.com',
    login: 'Alextxnk'
};
// вот так лучше не делать, потому что после компиляции подтянуься еще логин и email
const admin = Object.assign(Object.assign({}, user11), { role: 1 });
// Функция мапинга
function userToAdmin(user) {
    return {
        name: user.name,
        role: 1
    };
}
// Type Guard
function newLogId(id) {
    if (newIsString(id)) {
        console.log(id);
    }
    else {
        console.log(id);
    }
    // Flow типов
    // id; // id: string | number
}
// пример функции с Type Guard
// она возвращает boolean
function newIsString(x) {
    return typeof x === 'string';
}
function isAdmin(user) {
    return 'role' in user;
}
function isAdminAlternative(user) {
    return user.role !== undefined;
}
function setRoleZero(user) {
    if (isAdmin(user)) {
        user.role = 0;
    }
    else {
        throw new Error('User is not admin');
    }
}
// Задачка 4
// см файл test4.ts
