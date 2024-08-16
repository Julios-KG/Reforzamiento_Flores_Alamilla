import { useState } from "react"
import { IMeal } from "../../interfaces/IMeal"
import MealService from "../../services/MealService"

const usePostMeal = (endpoint: string) => {

    const [createdMeal, setCreatedMeal] = useState<IMeal | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    
    const mealService = new MealService(endpoint)

    const postNewMeal = async (newMeal: Omit<IMeal, 'idMeal' | 'category' >) => {

        setLoading(true)

        try {
            const result = await mealService.createMeal(newMeal)
            setCreatedMeal(result)
        } catch (error: any) {
            setError(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return { createdMeal, loading, error, postNewMeal}
}

export default usePostMeal