"use strict";
// TypeScript - статически типизированный ЯП
// Основные типы
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// для быстрого перемещения строк зажимаем Alt и делаем стрелками вверх/вниз
// Run Time (JS) vs Compile Time (TS)
// number - числа
// string - строки
// boolean - булевое значение
// any - любой (не надо его использовать)
let revenue = 1000;
let bonus = 500;
let res = revenue + bonus;
console.log(res);
let string = 'str';
let bool = true;
// Типы в функциях
function getFullName(firstName, surname) {
    return `${firstName} ${surname}`;
}
const getFullNameArrow = (firstName, surname) => {
    return `${firstName} ${surname}`;
};
// Объекты
const user = {
    firstName: 'Alexey',
    surname: 'Solovev',
    age: 21
};
const getUserData = (user) => {
    return `${user.firstName} ${user.surname}`;
};
getUserData(user);
// Задачка 1
let info;
// Массивы
const skills = ['Dev', 'Testing', 'DevOps', 'DBA'];
// string[] - массив строк,
// если мы хотим любые значения в массив, нужно написать any[]
// еще есть вариант использования tuples - кортежей
// Итерируемся по массиву
for (const skill of skills) {
    console.log(skill);
}
const reduceSkills = skills
    .filter((s) => s !== 'DevOps')
    .map((s) => s + '_')
    .reduce((a, b) => a + b);
console.log(reduceSkills);
// Union - можем передавать в массив много элементов
// skills: (string | number)[]
// Tuples - кортежи, в них определенное число элементов - это массив ограниченной длины
// skills: [number, string]
const human = [1, 'Alex'];
// const id = human[0];
// const entityName = human[1];
// То же самое - делаем деструктуризацию
// мы так же делаем в React, когда используем useState
// [name, setName] = useState();
const [id, entityName] = human;
human.push('Solov'); // мы можем запушить в такой массив
console.log(human);
const arr = [1, 'Str', true, false, false];
// Readonly - не можем изменять
const newArr = [
    1,
    'Str',
    true,
    false,
    false
];
const genericArr = ['Dev', 'Testing']; // то же самое, что и string[]
const readonlyArr = ['Dev', 'Testing']; // то же самое, что и readonly string[]
// Enums
// Гетерогенный Enum - может иметь числовые и строковые значения
// 1 - успех - 1
// 2 - в процессе - 2
// 3 - отклонен - f
// параметры Enums можно писать как в верхнем, так и в нижнем регистре - success либо SUCCESS
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Success"] = 1] = "Success";
    StatusCode[StatusCode["InProcess"] = 2] = "InProcess";
    StatusCode["Failed"] = "f";
})(StatusCode || (StatusCode = {}));
// Enums могут быть не только числовыми
const result = {
    message: 'Success payment',
    statusCode: StatusCode.Success
};
function action(status) { }
action(StatusCode.Success); // Success
action(2); // InProcess
// при компиляции получим только значение в переменной
const enumValue = 1 /* Roles.Admin */;
// Задачка 2
var QuestionStatus;
(function (QuestionStatus) {
    QuestionStatus["Published"] = "published";
    QuestionStatus["Draft"] = "draft";
    QuestionStatus["Deleted"] = "deleted";
})(QuestionStatus || (QuestionStatus = {}));
function getFaqs(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('/faqs', {
            method: 'POST',
            body: JSON.stringify(req)
        });
        const data = yield res.json();
        return data;
    });
}
