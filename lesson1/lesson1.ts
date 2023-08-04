// TypeScript - статически типизированный ЯП
// Основные типы

// number - числа
// string - строки
// boolean - булевое значение

// any - любой (не надо его использовать)

let revenue: number = 1000;
let bonus: number = 500;

let res: number = revenue + bonus;
console.log(res);

let string: string = 'str';
let bool: boolean = true;

// Типы в функциях
function getFullName(firstName: string, surname: string): string {
   return `${firstName} ${surname}`;
}

const getFullNameArrow = (firstName: string, surname: string): string => {
   return `${firstName} ${surname}`;
};

// Объекты
const user = {
   firstName: 'Alexey',
   surname: 'Solovev',
   age: 21
};

const getUserData = (user: {
   firstName: string;
   surname: string;
   age: number;
}): string => {
   return `${user.firstName} ${user.surname}`;
};

getUserData(user);

// Задачка 1
let info: {
   officeId: number;
   isOpened: boolean;
   contacts: {
      phone: string;
      email: string;
      address: {
         city: string;
      };
   };
};

// Массивы
const skills: string[] = ['Dev', 'Testing', 'DevOps', 'DBA'];

// string[] - массив строк,
// если мы хотим любые значения в массив, нужно написать any[]
// еще есть вариант использования tuples - кортежей

// Итерируемся по массиву
for (const skill of skills) {
   console.log(skill);
}

const reduceSkills = skills
   .filter((s: string) => s !== 'DevOps')
   .map((s: string) => s + '_')
   .reduce((a: string, b: string) => a + b);

console.log(reduceSkills);

// Union - можем передавать в массив много элементов
// skills: (string | number)[]

// Tuples - кортежи, в них определенное число элементов - это массив ограниченной длины
// skills: [number, string]

const human: [number, string] = [1, 'Alex'];

// const id = human[0];
// const entityName = human[1];

// То же самое - делаем деструктуризацию
// мы так же делаем в React, когда используем useState
// [name, setName] = useState();
const [id, entityName] = human;

human.push('Solov'); // мы можем запушить в такой массив
console.log(human);

const arr: [number, string, ...boolean[]] = [1, 'Str', true, false, false];

// Readonly - не можем изменять
const newArr: readonly [number, string, ...boolean[]] = [
   1,
   'Str',
   true,
   false,
   false
];
const genericArr: Array<string> = ['Dev', 'Testing']; // то же самое, что и string[]
const readonlyArr: ReadonlyArray<string> = ['Dev', 'Testing']; // то же самое, что и readonly string[]

// Enums

// Гетерогенный Enum - может иметь числовые и строковые значения
// 1 - успех - 1
// 2 - в процессе - 2
// 3 - отклонен - f

// параметры Enums можно писать как в верхнем, так и в нижнем регистре - success либо SUCCESS
enum StatusCode {
   Success = 1,
   InProcess,
   Failed = 'f'
}

// Enums могут быть не только числовыми

const result = {
   message: 'Success payment',
   statusCode: StatusCode.Success
};

function action(status: StatusCode) {}

action(StatusCode.Success); // Success
action(2); // InProcess

const enum Roles {
   Admin = 1,
   User = Admin * 2
}

// при компиляции получим только значение в переменной
const enumValue = Roles.Admin;

// Задачка 2
enum QuestionStatus {
   Published = 'published',
   Draft = 'draft',
   Deleted = 'deleted'
}

async function getFaqs(req: {
   topicId: number;
   status?: QuestionStatus;
}): Promise<
   {
      question: string;
      answer: string;
      tags: string[];
      likes: number;
      status: QuestionStatus;
   }[]
> {
   const res = await fetch('/faqs', {
      method: 'POST',
      body: JSON.stringify(req)
   });
   const data = await res.json();
   return data;
}
