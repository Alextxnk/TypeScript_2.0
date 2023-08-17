"use strict";
/*
Упражнение - валидация форм
Необходимо сделать тип для результата валидации формы,
основываясь на типе формы
*/
const form = {
    name: 'Alexey',
    password: 'qwerty'
};
const formValidation = {
    name: { isValid: true },
    password: {
        isValid: false,
        errorMessage: 'Пароль должен быть длинее 5 символов'
    }
};
