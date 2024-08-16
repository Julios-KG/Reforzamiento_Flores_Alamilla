import { useState } from "react"
import { IMeal } from "../../interfaces/IMeal"
import MealService from "../../services/MealService"

const usePutMeal = (endpoint: string) => {

    const [editedMeal, setEditedMeal] = useState<IMeal | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    
    const mealService = new MealService(endpoint)

    const putMeal = async (newMeal: IMeal) => {

        setLoading(true)

        try {
            const result = await mealService.updateMeal(newMeal.idMeal, newMeal)
            setEditedMeal(result)
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }
    }

    return { editedMeal, loading, error, putMeal}
}

export default usePutMeal