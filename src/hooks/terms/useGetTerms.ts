import { useEffect, useState } from "react"
import { ITerms } from "../../interfaces/ITerms"
import TermsService from "../../services/TermsService"

const useGetTerms = (endpoint: string) => {

    const [terms, setTerms] = useState<ITerms[] | []>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const termsService = new TermsService(endpoint)
    
    const getTerms = async () => {

        setLoading(true)

        try {
            const result = await termsService.GetTerms()
            setTerms(result)
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTerms()
    }, [endpoint])

    return { terms, loading, error, getTerms }
}

export default useGetTerms