import { useEffect, useState } from "react"
import { ICategory } from "../../interfaces/ICategory"
import CategoryService from "../../services/CategotyService"

const useGetCategory = (endpoint: string) => {

    const [category, setCategory] = useState<ICategory[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {

        const categoryService = new CategoryService(endpoint)

        const getCategories = async () => {
            try {
                const result = await categoryService.getCategories()
                setCategory(result)
            } catch (error) {
                setError(error as Error)
            } finally {
                setLoading(false)
            }
        }

        getCategories()
    }, [endpoint])

    return { category, loading, error }

}

export default useGetCategory