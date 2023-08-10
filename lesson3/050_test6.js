"use strict";
/**
Необходимо реализовать абстрактный класс Logger с 2-мя методами
абстрактным - log(message): void
printDate - выводящий в log дату
К нему необходимо сделать реальный класс, который бы имел метод: logWithDate,
выводящий сначала дату, а потом заданное сообщение
*/
class LoggerAbstract {
    printDate(date) {
        this.log(date.toString());
    }
}
class Log extends LoggerAbstract {
    log(message) {
        console.log(message);
    }
    logWithDate(message) {
        this.printDate(new Date()); // Thu Aug 10 2023 15:04:46 GMT+0300 (Москва, стандартное время)
        this.log(message); // message
    }
}
const logAbs = new Log();
logAbs.logWithDate('message');
