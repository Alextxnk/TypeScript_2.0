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

function logIdFunc<T extends string | number>(id: T) {}
