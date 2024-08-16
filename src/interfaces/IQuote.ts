import { IUser } from "./IUser";

export interface IQuote {
    idQuote:    number;
    place:      string;
    numMeals:   number;
    date:       Date;
    status:     number;
    totalPrice: number;
    idUser:     number;
    user:       IUser;
    quoteItems: QuoteItem[];
}

export interface QuoteItem {
    idMeal:      number;
    quantity:    number;
}
