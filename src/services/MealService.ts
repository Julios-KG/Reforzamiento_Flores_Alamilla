import { IMeal } from "../interfaces/IMeal";
import apiClient from "../apiClient";

export default class MealService {

    private endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    // ------- GET MEALS ------- //

    public getMeals = async (): Promise<IMeal[]> => {
        try {
            const response = await apiClient.get(this.endpoint)
            const result = response.data.result.map(this.transformIMeal)
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- GET ONE MEAL ------- //

    public getOneMeal = async (id: number): Promise<IMeal> => {
        try {
            const response = await apiClient.get(`${this.endpoint}/${id}`)
            const result = response.data.result
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- POST MEALS ------- //

    public createMeal = async (meal: Omit<IMeal, 'idMeal' | 'category' >): Promise<IMeal> => {
        try {
            const response = await apiClient.post(this.endpoint, meal)
            const result = this.transformIMeal(response.data.result)
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- PUT MEALS ------- //

    public updateMeal = async (id: number, meal: Partial<IMeal>): Promise<IMeal> => {
        try {
            const response = await apiClient.put(`${this.endpoint}/${id}`, meal)
            const result = this.transformIMeal(response.data.result)
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- DELETE MEALS ------- //

    public deleteMeal = async (id: number): Promise<void> => {
            try {
                const result = await apiClient.delete(`${this.endpoint}/${id}`)
                console.log(`Meal deleted: `, result)
            } catch (error) {
                console.log('Error: ', error)
                throw error
            }
    }
    
    // ------- TRANSFORMER ------- //

    private transformIMeal(meal: IMeal): IMeal {
        return {
            idMeal: meal.idMeal,
            title: meal.title,
            description: meal.description,
            ingredients: meal.ingredients,
            status: meal.status,
            price: meal.price,
            urlImage: meal.urlImage,
            quantity: meal.quantity,
            idCategory: meal.idCategory,
            category: {
                idCategory: meal.category.idCategory,
                nameCategory: meal.category.nameCategory,
            }
        }
    }
}
