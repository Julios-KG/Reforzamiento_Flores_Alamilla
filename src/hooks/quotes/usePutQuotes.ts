import { useState } from "react"
import { IQuote } from "../../interfaces/IQuote"
import QuoteService from "../../services/QuoteService"

const usePutQuote = (endpoint: string) => {

    const [editedQuote, setEditedQuote] = useState<IQuote | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    
    const quoteService = new QuoteService(endpoint)

    const putQuote = async (newQuote: IQuote) => {

        setLoading(true)

        try {
            const result = await quoteService.updateQuote(newQuote.idQuote, newQuote)
            setEditedQuote(result)
        } catch (error: any) {
            setError(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return { editedQuote, loading, error, putQuote}
}

export default usePutQuote