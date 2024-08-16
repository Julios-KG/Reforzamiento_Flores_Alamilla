import { useState } from "react"
import { IQuote } from "../../interfaces/IQuote"
import QuoteService from "../../services/QuoteService"

const usePostQuote = (endpoint: string) => {

    const [createdQuote, setCreatedQuote] = useState<IQuote | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    
    const quoteService = new QuoteService(endpoint)

    const postNewQuote = async (newQuote: Omit<IQuote, 'idQuote' | 'user' >) => {

        setLoading(true)

        try {
            const result = await quoteService.createQuote(newQuote)
            setCreatedQuote(result)
        } catch (error: any) {
            setError(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return { createdQuote, loading, error, postNewQuote}
}

export default usePostQuote