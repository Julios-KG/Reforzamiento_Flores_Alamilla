import { useState } from "react"
import { IUser } from "../../interfaces/IUser"
import UserService from "../../services/UserService"

const usePutUser = (endpoint: string) => {
    const [editedUser, setEditedUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const userService = new UserService(endpoint)

    const putUser = async (newUser: IUser) => {
        setLoading(true)

        try {
            const result = await userService.UpdateUser(newUser.idUser, newUser)
            setEditedUser(result)
            return result
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }
    }

    return { editedUser, loading, error, putUser }
}

export default usePutUser