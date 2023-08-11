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
function logIdFunc(id) { }
