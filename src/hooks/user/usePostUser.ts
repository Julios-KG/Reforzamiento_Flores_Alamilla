import { useState } from "react"
import { IUser } from "../../interfaces/IUser"
import UserService from "../../services/UserService"


const usePostUser = (endpoint: string) => {
    const [createdUser, setCreatedUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const userService = new UserService(endpoint)

    const postNewUser = async (newUser: Omit<IUser, 'idUser'>) => {
        setLoading(true)

        try {
            const result = await userService.CreateUser(newUser)
            setCreatedUser(result)
            return result
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }
    }

    return { createdUser, loading, error, postNewUser }
}

export default usePostUser