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
// typeof
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
