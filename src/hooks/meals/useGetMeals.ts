import { useEffect, useState } from "react";
import MealService from "../../services/MealService";
import { IMeal } from "../../interfaces/IMeal";

const useGetMeal = (endpoint: string) => {

    const [meal, setMeal] = useState<IMeal[] | []>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    const mealService = new MealService(endpoint)
    
    const getMeals = async () => {
        try {
            const result = await mealService.getMeals()
            setMeal(result)
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)    
        }
    }

    useEffect(() => {
        getMeals()
    },[endpoint])

    return {meal, loading, error, getMeals}
}

export default useGetMeal