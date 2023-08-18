// Generics - обобщенный тип
// благодаря им мы можем делать универсальные функции с точки зрения типов

// встроенные Generics
const array: Array<number> = [1, 2, 3];

async function testFunc() {
   const promise = await new Promise<number>((resolve, reject) => {
      resolve(1);
   });
}

// Record означает, что у нас могут находиться свойства типов string и boolean
const record: Record<string, boolean> = {
   drive: true,
   kpp: false
};

// функция с Generic
// c их помощью мы можем сделать обобщенную универсальную функцию,
// которая будет работать с любыми типами, которые мы передадим
function logMiddleware<T>(data: T): T {
   console.log(data);
   return data;
}

const logRes = logMiddleware<number>(10);

// еще пример функции с Generic
function getSplittedHalf<T>(data: Array<T>): Array<T> {
   const l = data.length / 2;
   return data.splice(0, l);
}

const resSplit = getSplittedHalf<number>([1, 3, 2, 4, 7, 5]);
console.log('resSplit', resSplit);

// функция преобразования в строку
// написать функцию toString, которая принимает любой тип и возвращает его строковое представление,
// если не может, то возвращает undefined
function toString<T>(data: T): string | undefined {
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
const split: <T>(data: Array<T>) => Array<T> = getSplittedHalf;

interface ILogLine<T> {
   timeStamp: Date;
   data: T;
}

type LogLineType<T> = {
   timeStamp: Date;
   data: T;
};

const logLine: ILogLine<{ a: number }> = {
   timeStamp: new Date(),
   data: {
      a: 1
   }
};

// ограничение Generic
class VehicleC {
   run: number;
}

// мы также можем extends типы и интерфейсы
function kmToMiles<T extends VehicleC>(vehicle: T): T {
   vehicle.run = vehicle.run / 0.62;
   return vehicle;
}

class LCV extends VehicleC {
   capacity: number;
}

const vehicle = kmToMiles(new VehicleC());
const lcv = kmToMiles(new LCV());
kmToMiles({ run: 120 });

// мы можем использовать несколько Generic, если нам это необходимо
function logIdFunc<T extends string | number, Y>(
   id: T,
   data: Y
): { id: T; data: Y } {
   console.log(id);
   return { id, data };
}

// Generic классы
class Resp<D, E> {
   data?: D;
   error?: E;

   constructor(data?: D, error?: E) {
      if (data) {
         this.data = data;
      }

      if (error) {
         this.error = error;
      }
   }
}

const respRes = new Resp<string, number>('data', 500);

class HTTPResp<F> extends Resp<string, number> {
   code: F;

   setCode(code: F) {
      this.code = code;
   }
}

const httpRes = new HTTPResp<number>();

// Mixins
// Наследование: Payment -> extends PaymentPersistent
// Композиция: Engine, Wheels -> constructor Vehicle
// Миксины: List, Accordion -> ListAccordion
// по сути Миксины реализуют возможность наследования от нескольких классов,
// либо они используются, как добавление примесей дополнительных свойств, тому или иному объекту без явного наследования

type Constructor = new (...args: any[]) => {};

// Generic constructor
// еще мы можем задать значение по-умолчанию для дженерика
type GConstructor<T = {}> = new (...args: any[]) => T;

class List {
   constructor(public items: string[]) {}
}

class Accordion {
   isOpened: boolean;
}

type ListType = GConstructor<List>;
type AccordionType = GConstructor<Accordion>;

// Миксин - это функция
// расширяем функционал

// сначала напишем обычный класс
class ExtendedListClass extends List {
   first() {
      return this.items[0];
   }
}

// теперь в виде миксина
// миксины позволяют нам "делать наследование" нескольких классов одновременно

// DCI подход - это преимущество, когда мы можем динамически подставлять
// тот или иной необходимый нам объект в функцию

// в миксине мы возвращаем класс, который наследует переданный класс
// мы получаем в дженерике type checking классов
function ExtendedList<TBase extends ListType & AccordionType>(Base: TBase) {
   return class ExtendedList extends Base {
      first() {
         return this.items[0];
      }
   };
}

// и в итоге этот класс получает все возможности класса Accordion и класса List
class AccordionList {
   isOpened: boolean;
   constructor(public items: string[]) {}
}

const list = ExtendedList(AccordionList);
const resList = new list(['first', 'second']);
console.log(resList.first()); // first
