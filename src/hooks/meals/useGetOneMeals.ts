import { IMeal } from "../../interfaces/IMeal"
import { useEffect, useState } from "react"
import MealService from "../../services/MealService"

const useGetOneMeals = (enpoint:string, idMeal: number) => {
    const [meal, setMeal] = useState<IMeal | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const mealService = new MealService(enpoint)

        const getOneMeal = async () => {
            try {   
                const result = await mealService.getOneMeal(idMeal)                
                setMeal(result)
            } catch (error) {
                setError(error as Error)
            } finally {
                setLoading(false)
            }
        }

        getOneMeal()
    }, [enpoint, idMeal])

    return { meal, loading, error }

}

export default useGetOneMeals