import { useEffect, useState } from "react";
import QuoteService from "../../services/QuoteService";
import { IQuote } from "../../interfaces/IQuote";

const useGetQuotes = (endpoint: string) => {

    const [quote, setQuote] = useState<IQuote[] | []>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    const quoteService = new QuoteService(endpoint)
    
    const getQuotes = async () => {
        try {
            const result = await quoteService.getQuotes()
            setQuote(result)
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)    
        }
    }

    useEffect(() => {
        getQuotes()
    },[endpoint])

    return {quote, loading, error, getQuotes}
}

export default useGetQuotes