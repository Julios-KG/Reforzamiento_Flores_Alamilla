import { useState } from "react"
import { IUser } from "../../interfaces/IUser"
import UserService from "../../services/UserService"

const useLogin = (endpoint: string) => {
    
    const [userLoged, setUserLoged] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    
    const userService = new UserService(endpoint)

    const loginUser = async (email: string, password: string) => {
        setLoading(true)

        try {
            const result = await userService.LogIn(email, password)
            setUserLoged(result)
            return result
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }

    }

    return { userLoged, loading, error, loginUser }
}

export default useLogin