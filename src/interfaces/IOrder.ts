import { IUser } from "./IUser";
import { IMeal } from "./IMeal";

export interface IOrder {
    idOrder:    number;
    numMeals:   number;
    idUser:     number;
    user:       IUser;
    date:       string;
    hour:       string;
    place:      string;
    status:     number;
    totalPrice: number;
    orderItems: OrderItem[];
}

export interface OrderItem {
    idOrderItem: number;
    quantity:    number;
    idMeal:      number;
    meal:        IMeal;
}