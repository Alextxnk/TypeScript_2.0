// Классы
// JS и TS - мультипарадигменные ЯП, мы можем писать как в функциональном программировании, так и в ООП стиле

// TS похож на C# т.к. у него один автор

// приниципы ООП:
// 1. Абстракция - когда мы скрываем какие-то части нашей реализации или наоборот не дополняем наш объект для того,
// чтобы абстрагироваться от реального объекта,
// также можем скрывать какие-то методы реализации, предоставляя наверх другим пользователям нашего компонента
// только определенные наборы методов

// 2. Инкапсуляция - это механизм размещения не только данных внутри нашего класса, но и методов работы с ним

// 3. Наследование

// 4. Полиморфизм - когда мы имеем возможность по одному интерфейсу делать множество абстракций,
// написать множество реализаций одного интерфейса

class CUser {
   name: string;
   age: number;

   // overload - перегрузка
   // три перегрузки
   constructor();
   constructor(name: string);
   constructor(age: number);

   constructor(ageOrName?: string | number) {
      if (typeof ageOrName === 'string') {
         this.name = ageOrName;
      } else if (typeof ageOrName === 'number') {
         this.age = ageOrName;
      }
   }
}

// делаем инстанс пользователя
const user1 = new CUser('Alex');
console.log(user1);

user1.name = 'Dima';
console.log(user1);

class Admin {
   role: number;
}

const admin1 = new Admin();
admin1.role = 1;

// методы класса
// метод - это функция внутри класса, которая выполняет какие-то действия
enum PaymentStatus {
   Holded,
   Processed,
   Reversed
}

class Payment {
   id: number;
   status: PaymentStatus = PaymentStatus.Holded;
   createdAt: Date = new Date();
   updatedAt: Date;

   constructor(id: number) {
      this.id = id;
   }

   getPaymentLifeTime(): number {
      return new Date().getTime() - this.createdAt.getTime();
   }

   unholdPayment(): void {
      if (this.status === PaymentStatus.Processed) {
         throw new Error('Платеж не может быть возвращен');
      }

      this.status = PaymentStatus.Reversed;
      this.updatedAt = new Date();
   }
}

const payment = new Payment(1);
payment.unholdPayment();
console.log(payment);
const time = payment.getPaymentLifeTime();
console.log(time);

// продолжим с перегрузкой методов
class User2 {
   skills: string[];

   addSkill(skill: string): void;
   addSkill(skill: string[]): void;
   addSkill(skillOrSkills: string | string[]): void {
      if (typeof skillOrSkills === 'string') {
         this.skills.push(skillOrSkills);
      } else {
         this.skills.concat(skillOrSkills);
      }
   }
}

function run(distance: string): string;
function run(distance: number): number;
function run(distance: number | string): number | string {
   if (typeof distance === 'number') {
      return 1;
   } else {
      return 'distance';
   }
}

// геттеры и сеттеры - позволяют нам переопределить, то как будет присваиваться или получаться свойство нашего объекта
