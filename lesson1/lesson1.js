"use strict";
// TypeScript - статически типизированный ЯП
// Основные типы
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
const id = human[0];
const entityName = human[1];
human.push('Solov');
console.log(human);
