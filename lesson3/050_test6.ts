/** 
Необходимо реализовать абстрактный класс Logger с 2-мя методами
абстрактным - log(message): void
printDate - выводящий в log дату
К нему необходимо сделать реальный класс, который бы имел метод: logWithDate,
выводящий сначала дату, а потом заданное сообщение 
*/

abstract class LoggerAbstract {
   abstract log(message: string): void;

   printDate(date: Date) {
      this.log(date.toString());
   }
}

class Log extends LoggerAbstract {
   log(message: string): void {
      console.log(message);
   }

   logWithDate(message: string) {
      this.printDate(new Date()); // Thu Aug 10 2023 15:04:46 GMT+0300 (Москва, стандартное время)
      this.log(message); // message
   }
}

const logAbs = new Log();
logAbs.logWithDate('message');
