// Generics - обобщенный тип
// благодаря им мы можем делать универсальные функции с точки зрения типов

// встроенные Generics
const array: Array<number> = [1, 2, 3];

async function test() {
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

getSplittedHalf<number>([1, 3, 2, 4, 7, 5]);
