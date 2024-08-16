import apiClient from "../apiClient"
import { IUser } from "../interfaces/IUser"

export default class UserService {
    
    private endpoint: string
    
    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    // ------- Register Request ------- //

    public CreateUser = async (user: Omit<IUser, 'idUser'>): Promise<IUser> => {
        try {
            const response = await apiClient.post(this.endpoint, user)
            const result = this.transformIUser(response.data.result)
            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // ------- Log In Request ------- //

    public LogIn = async (email: string, password: string): Promise<IUser> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await apiClient.post(this.endpoint, { email, password })

            if (response.data && response.data.result) {
                const result = this.transformIUser(response.data.result)

                if (response.data.message) {
                    localStorage.setItem('authToken', response.data.message)
                    localStorage.setItem('userInfo', JSON.stringify(response.data.result))
                }
                return result
            } else {
                throw new Error('Error al recibir usuario')
            }
        } catch (error) {
            throw error
        }
    }

    // ------- Update User ------- //

    public UpdateUser = async (idUser: number, user: Partial<Omit<IUser, 'idUser'>>): Promise<IUser> => {
        try {
            const response = await apiClient.put(`${this.endpoint}/${idUser}`, user)
            const result = this.transformIUser(response.data.result)
            return result

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // ------- TRANSFORMER ------- //

    private transformIUser(user: IUser): IUser {
        return {
            idUser: user.idUser,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            urlPP: user.urlPP,
            idRole: user.idRole,
            family_name: user.family_name,
            given_name: user.given_name,
            picture: user.picture
        }
    }
}