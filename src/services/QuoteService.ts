import { IQuote } from "../interfaces/IQuote";
import apiClient from "../apiClient";

export default class QuoteService {

    private endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    // ------- GET QUOTES ------- //

    public getQuotes = async (): Promise<IQuote[]> => {
        try {
            const response = await apiClient.get(this.endpoint)
            const result = response.data.result.map(this.transformIMeal)
            // const result = response.data.result.map(this.transformIMeal)
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- GET ONE QUOTE ------- //

    public getOneQuote = async (id: number): Promise<IQuote> => {
        try {
            const response = await apiClient.get(`${this.endpoint}/${id}`)
            const result = response.data.result
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- POST QUOTES ------- //

    public createQuote = async (quote: Omit<IQuote, 'idQuote' | 'user' >): Promise<IQuote> => {
        try {
            const response = await apiClient.post(this.endpoint, quote)
            const result = this.transformIMeal(response.data.result)
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- PUT QUOTES ------- //

    public updateQuote = async (id: number, quote: Partial<IQuote>): Promise<IQuote> => {
        try {
            const response = await apiClient.put(`${this.endpoint}/${id}`, quote)
            const result = this.transformIMeal(response.data.result)
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- DELETE QUOTES ------- //

    public deleteQuote = async (id: number): Promise<void> => {
            try {
                const result = await apiClient.delete(`${this.endpoint}/${id}`)
                console.log(`Quote deleted: `, result)
            } catch (error) {
                console.log('Error: ', error)
                throw error
            }
    }
    
    // ------- TRANSFORMER ------- //

    private transformIMeal(quote: IQuote): IQuote {
        return {
            idQuote: quote.idQuote,
            place: quote.place,
            numMeals: quote.numMeals,
            date: quote.date,
            totalPrice: quote.totalPrice,
            status: quote.status,
            idUser: quote.idUser,
            user: quote.user,
            quoteItems: quote.quoteItems
        }
    }
}
