"use strict";
/*
Необходимо написать функцию сортировки любых
объектов, которые имеют id по убыванию и по возрастанию
*/
const data = [
    { id: 2, name: 'Петя' },
    { id: 1, name: 'Вася' },
    { id: 3, name: 'Надя' }
];
// extends - прописываем ограничение для Generic
function sortObj(data, type = 'asc') {
    return data.sort((a, b) => {
        switch (type) {
            case 'asc':
                return a.id - b.id;
            case 'desc':
                return b.id - a.id;
        }
    });
}
console.log(sortObj(data, 'desc'));
console.log(sortObj(data, 'asc'));
