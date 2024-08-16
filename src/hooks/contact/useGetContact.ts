import { useEffect, useState } from "react"
import { IContact } from "../../interfaces/IContact"
import ContactService from "../../services/ContactService"


const useGetContact = (endpoint: string) => {
    
    const [contact, setContact] = useState<IContact[] | []>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    const contactService = new ContactService(endpoint)

    const getContacts = async () => {
        try {
            const result = await contactService.getContact()
            setContact(result)
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getContacts()
    },[endpoint])

    return { contact, loading, error }
}

export default useGetContact