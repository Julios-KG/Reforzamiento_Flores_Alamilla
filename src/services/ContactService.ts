import { IContact } from "../interfaces/IContact"
import apiClient from "../apiClient"


export default class ContactService {

    private endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    // ------- GET CONTACTS ------- //

    public getContact = async (): Promise<IContact[]> => {
        try {
            const response = await apiClient.get(this.endpoint)
            const result = response.data.result.map(this.transformIContact)
            return result

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // ------- GET ONE CONTACT ------- //

    public getOneContact = async (id: number): Promise<IContact> => {
        try {
            const response = await apiClient.get(`${this.endpoint}/${id}`)
            const result = this.transformIContact(response.data.result)
            return result

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // ------- POST CONTACT ------- //

    public createContact = async (contact: Omit<IContact, 'idContact'>): Promise<IContact> => {
        try {
            const response = await apiClient.post(this.endpoint, contact)
            const result = this.transformIContact(response.data.result)
            return result

        } catch (error) {
            console.log(error)
            throw error
        }
    } 

    // ------- DELETE CONTACT ------- //

    public deleteContact = async (id: number): Promise<void> => {
        try {
            await apiClient.delete(`${this.endpoint}/${id}`)
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    // ------- TRANSFORMER ------- //

    private transformIContact(contact: IContact): IContact {
        return {
            idContact: contact.idContact,
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message,
        }
    }
}