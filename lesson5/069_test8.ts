/* 
Необходимо написать функцию группировки, которая принимает массив объектов
и его ключ, производит группировку по указанному ключу и возращает
сгруппированный объект.
Пример:

[
	{ group: 1, name: 'a' },
	{ group: 1, name: 'b' },
	{ group: 2, name: 'c' },
];

При группироке по 'group' ---->

{
	'1': [ { group: 1, name: 'a' }, { group: 1, name: 'b' } ],
	'2': [ { group: 2, name: 'c' } ]
} 
*/

interface Data {
   group: number;
   name: string;
}

const groupArr: Data[] = [
   { group: 1, name: 'a' },
   { group: 1, name: 'b' },
   { group: 2, name: 'c' }
];

interface IGroup<T> {
   [key: string]: T[];
}

type key = string | number | symbol;

function group<T extends Record<key, any>>(arr: T[], key: keyof T): IGroup<T> {
   return arr.reduce<IGroup<T>>((map: IGroup<T>, item) => {
      const itemKey = item[key];
      let curEl = map[itemKey];

      if (Array.isArray(curEl)) {
         curEl.push(item);
      } else {
         curEl = [item];
      }

      map[itemKey] = curEl;
      return map;
   }, {});
}

const groupRes = group<Data>(groupArr, 'group');
console.log(groupRes);
