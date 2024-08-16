import { ICategory } from "./ICategory";

export interface IMeal {
    idMeal: number,
    title: string,
    description: string,
    ingredients: string,
    status: string,
    price: string,
    quantity: number,
    urlImage: string,
    idCategory: number,
    category: ICategory,
}