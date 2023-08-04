// Реализовать функцию awaited, которая умеет выполнять переданные промисы по очереди без использования async, await
// awaited будет являться неким полифилом для top-level await

// Очередность выполнения awaited будем проверять через функцию sleep

function sleep(delay: number, fn: () => void) {
   // Функция sleep возвращает промис, который резолвится после заданной задержки и выполняет функцию fn
   return new Promise<void>((res) => {
      setTimeout(() => res(fn()), delay);
   });
}

// Возвращаем промисы, созданные с помощью функции sleep
const first = () => sleep(1000, () => console.log('First'));
const second = () => sleep(500, () => console.log('Second'));
const third = () => sleep(200, () => console.log('Third'));

function asyncCreator() {
   let initPromise = Promise.resolve() as Promise<unknown>;

   return {
      awaited(fn: () => Promise<unknown>) {
         initPromise = initPromise.then(fn);
      }
   };
}

const { awaited } = asyncCreator();

awaited(first);
awaited(second);
awaited(third);
