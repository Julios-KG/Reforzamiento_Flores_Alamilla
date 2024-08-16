import apiClient from "../apiClient"
import { ITerms } from "../interfaces/ITerms"

export default class TermsService {
    
    private endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    // ------- Get Terms ------- //
    public GetTerms = async (): Promise<ITerms[]> => {
        try {
            const response = await apiClient.get(this.endpoint)
            const result = response.data.result.map(this.transformITerm)
            return result
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    private transformITerm(term: ITerms): ITerms {
        return {
            idTerms: term.idTerms,
            title: term.title,
            termsItem: term.termsItem
        }
    }
}