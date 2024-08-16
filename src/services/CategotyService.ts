import apiClient from "../apiClient"
import { ICategory } from "../interfaces/ICategory"

export default class CategoryService {


    private endpoint: string

    constructor (endpoint: string) {
        this.endpoint = endpoint
    }

    // ------- GET CATEGORIES ------- //

    public getCategories = async(): Promise<ICategory[]> => {
        try {
            const response = await apiClient.get(this.endpoint)
            const result = response.data.result.map(this.transformICategory)
            return result

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // ------- GET ONE CATEGORY ------- //

    public getOneCategory = async(id: number): Promise<ICategory> => {
        try {
            const response = await apiClient.get(`${this.endpoint}/${id}`)
            const result = this.transformICategory(response.data.result)
            return result

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // ------- POST CATEGORY ------- //

    public createCategory = async(category: Omit<ICategory, 'idCategory'>): Promise<ICategory> => {
        try {
            const response = await apiClient.post(this.endpoint, category)
            const result = this.transformICategory(response.data.result)
            return result

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // ------- TRANSFORMER ------- //

    private transformICategory(category: ICategory): ICategory {
        return {
            idCategory: category.idCategory,
            nameCategory: category.nameCategory,
        }
    }
}