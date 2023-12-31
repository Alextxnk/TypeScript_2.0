"use strict";
// Generics - обобщенный тип
// благодаря им мы можем делать универсальные функции с точки зрения типов
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// встроенные Generics
const array = [1, 2, 3];
function testFunc() {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = yield new Promise((resolve, reject) => {
            resolve(1);
        });
    });
}
// Record означает, что у нас могут находиться свойства типов string и boolean
const record = {
    drive: true,
    kpp: false
};
// функция с Generic
// c их помощью мы можем сделать обобщенную универсальную функцию,
// которая будет работать с любыми типами, которые мы передадим
function logMiddleware(data) {
    console.log(data);
    return data;
}
const logRes = logMiddleware(10);
// еще пример функции с Generic
function getSplittedHalf(data) {
    const l = data.length / 2;
    return data.splice(0, l);
}
const resSplit = getSplittedHalf([1, 3, 2, 4, 7, 5]);
console.log('resSplit', resSplit);
// функция преобразования в строку
// написать функцию toString, которая принимает любой тип и возвращает его строковое представление,
// если не может, то возвращает undefined
function toString(data) {
    if (Array.isArray(data)) {
        return data.toString();
    }
    switch (typeof data) {
        case 'string':
            return data;
        case 'number':
        case 'symbol':
        case 'bigint':
        case 'boolean':
        case 'function':
            return data.toString();
        case 'object':
            return JSON.stringify(data);
        default:
            return undefined;
    }
}
console.log('str', toString(['data', 'str']));
console.log('str', toString(true));
console.log('str', toString(5));
console.log('str', toString({ a: 'data', b: 'str' }));
console.log('str', toString(getSplittedHalf));
// использование в типах
const split = getSplittedHalf;
const logLine = {
    timeStamp: new Date(),
    data: {
        a: 1
    }
};
// ограничение Generic
class VehicleC {
}
// мы также можем extends типы и интерфейсы
function kmToMiles(vehicle) {
    vehicle.run = vehicle.run / 0.62;
    return vehicle;
}
class LCV extends VehicleC {
}
const vehicle = kmToMiles(new VehicleC());
const lcv = kmToMiles(new LCV());
kmToMiles({ run: 120 });
// мы можем использовать несколько Generic, если нам это необходимо
function logIdFunc(id, data) {
    console.log(id);
    return { id, data };
}
// Generic классы
class Resp {
    constructor(data, error) {
        if (data) {
            this.data = data;
        }
        if (error) {
            this.error = error;
        }
    }
}
const respRes = new Resp('data', 500);
class HTTPResp extends Resp {
    setCode(code) {
        this.code = code;
    }
}
const httpRes = new HTTPResp();
class List {
    constructor(items) {
        this.items = items;
    }
}
class Accordion {
}
// Миксин - это функция
// расширяем функционал
// сначала напишем обычный класс
class ExtendedListClass extends List {
    first() {
        return this.items[0];
    }
}
// теперь в виде миксина
// миксины позволяют нам "делать наследование" нескольких кдассов одновременно
// DCI подход - это преимущество, когда мы можем динамически подставлять
// тот или иной необходимый нам объект в функцию
// в миксине мы возвращаем класс, который наследует переданный класс
// мы получаем в дженерике type checking классов
function ExtendedList(Base) {
    return class ExtendedList extends Base {
        first() {
            return this.items[0];
        }
    };
}
// и в итоге этот класс получает все возможности класса Accordion и класса List
class AccordionList {
    constructor(items) {
        this.items = items;
    }
}
const list = ExtendedList(AccordionList);
const resList = new list(['first', 'second']);
console.log(resList.first()); // first
