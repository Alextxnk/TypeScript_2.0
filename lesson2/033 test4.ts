interface IPayment {
   sum: number;
   from: number;
   to: number;
}

enum PaymentStatus {
   Success = 'success',
   Failed = 'failed'
}

interface IPaymentRequest extends IPayment {}

interface IDataSuccess extends IPayment {
   databaseId: number;
}

interface IDataFailed {
   errorMessage: string;
   errorCode: number;
}

interface IResponseSuccess {
   status: PaymentStatus.Success;
   data: IDataSuccess;
}

interface IResponseFailed {
   status: PaymentStatus.Failed;
   data: IDataFailed;
}

type ResponsePayment = IResponseSuccess | IResponseFailed;

function isSuccess(res: ResponsePayment): res is IResponseSuccess {
   if (res.status === PaymentStatus.Success) {
      return true;
   }

   return false;
}

function getIdFromData(res: ResponsePayment): number {
   if (isSuccess(res)) {
      return res.data.databaseId;
   } else {
      throw new Error(res.data.errorMessage);
   }
}
