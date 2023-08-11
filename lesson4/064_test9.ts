/* 
Необходимо написать функцию сортировки любых
объектов, которые имеют id по убыванию и по возрастанию 
*/

const data = [
   { id: 2, name: 'Петя' },
   { id: 1, name: 'Вася' },
   { id: 3, name: 'Надя' }
];

interface I_ID {
   id: number;
}

// extends - прописываем ограничение для Generic

function sortObj<T extends I_ID>(data: T[], type: 'asc' | 'desc' = 'asc'): T[] {
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
