import { useState } from "react"
import { IContact } from "../../interfaces/IContact"
import ContactService from "../../services/ContactService"

const usePostContact = (endpoint: string) => {

    const [createdContact, setCreatedContact] = useState<IContact | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    
    const contactService = new ContactService(endpoint)

    const postNewContact = async (newContact: Omit<IContact, 'idContact'>) => {

        setLoading(true)

        try {
            const result = await contactService.createContact(newContact)
            setCreatedContact(result)
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }
    }

    return { createdContact, loading, error, postNewContact }
}

export default usePostContact