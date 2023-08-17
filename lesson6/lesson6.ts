// служебные типы

// partial, required, readonly
// все эти типы построены на mapped types
interface ServiceUser {
   name: string;
   age?: number;
   email: string;
}

// Partial - длеает все свойства опциональными (необязательными)
type partial = Partial<ServiceUser>;

// POLYFILL Partial
type OwnPartial<T> = {
   [P in keyof T]?: T[P];
};

const part: partial = {};

// required - делает все поля обязательными
type required = Required<ServiceUser>;

// POLYFILL Required
type OwnRequired<T> = {
   [P in keyof T]-?: T[P];
};

// readonly
type readonly = Readonly<ServiceUser>;

// POLYFILL Readonly
type OwnReadonly<T> = {
   readonly [P in keyof T]: T[P];
};

// комбинация дженериков
type requiredAndReadonly = Required<Readonly<ServiceUser>>;

// pick, omit, extract, exclude
interface PaymentPersistentI {
   id: number;
   sum: number;
   from: string;
   to: string;
}

// omit - исключает ключи, выбрасывает ключ id
type PaymentOmit = Omit<PaymentPersistentI, 'id'>;

// POLYFILL Omit
type OwnOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// pick - делает обратное omit, берет только перечисленные ключи
type PaymentRequisites = Pick<PaymentPersistentI, 'from' | 'to'>;

// POLYFILL Pick
type OwnPick<T, K extends keyof T> = {
   [P in K]: T[P];
};

// extract - берем из типа только свойства со строками
type ExtractEx = Extract<'from' | 'to' | PaymentOmit, string>; // "from" | "to"

// POLYFILL Extract
type OwnExtract<T, U> = T extends U ? T : never;

// exclude
type ExcludeEx = Exclude<'from' | 'to' | PaymentOmit, string>; // PaymentOmit

// POLYFILL Exclude
type OwnExclude<T, U> = T extends U ? never : T;
