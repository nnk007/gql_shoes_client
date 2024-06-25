import { createContext } from "react";

export enum PaymentMethod {
    CRYPTO,
    FIAT
}
export const PaymentMethodContext = createContext<PaymentMethod>(PaymentMethod.FIAT);
export const CryptoRateContext = createContext<number>(1);