import { useState } from "react"
import { IMeal } from "../../interfaces/IMeal"
import MealService from "../../services/MealService"

const useDeleteMeal = (endpoint: string) => {

    const [deletedMeal, setDeletedMeal] = useState<IMeal | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    
    const mealService = new MealService(endpoint)

    const deleteMeal = async (id: number) => {

        setLoading(true)

        try {
            const result = await mealService.deleteMeal(id)
            
        } catch (error: any) {
            setError(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return { deletedMeal, loading, error, deleteMeal}
}

export default useDeleteMeal