import { useEffect, useState } from "react";
import MealService from "../../services/MealService";
import { IMeal } from "../../interfaces/IMeal";

const useGetMealsByIds = (endpoint: string, ids: number[]) => {
    const [meals, setMeals] = useState<IMeal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const mealService = new MealService(endpoint);
  
      const getMeals = async () => {
        try {
          const promises = ids.map((id) => mealService.getOneMeal(id));
          const result = await Promise.all(promises);
          setMeals(result);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      };
  
      if (ids.length > 0) {
        getMeals();
      } else {
        setLoading(false);
      }
    }, [endpoint, ids]);
  
    return { meals, loading, error };
  };
  
  export default useGetMealsByIds;
