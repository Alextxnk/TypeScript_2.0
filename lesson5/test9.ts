/* 
Упражнение - валидация форм
Необходимо сделать тип для результата валидации формы,
основываясь на типе формы
*/

interface IForm {
   name: string;
   password: string;
}

const form: IForm = {
   name: 'Alexey',
   password: 'qwerty'
};

const formValidation: Validation<IForm> = {
   name: { isValid: true },
   password: {
      isValid: false,
      errorMessage: 'Пароль должен быть длинее 5 символов'
   }
};

type Validation<T> = {
   [k in keyof T]:{
      isValid: true;
   } | {
      isValid: false;
      errorMessage: string;
   };
};
