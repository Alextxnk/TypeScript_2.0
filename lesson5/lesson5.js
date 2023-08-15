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
