import { IOrder } from "../interfaces/IOrder";
import apiClient from "../apiClient";

export default class OrderService {

    private endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    // ------- GET ORDERS ------- //

    public getOrders = async (): Promise<IOrder[]> => {
        try {
            const response = await apiClient.get(this.endpoint)
            const result = response.data.result.map(this.transformIOrder)
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- GET ONE ORDER ------- //

    public getOneOrder = async (id: number): Promise<IOrder> => {
        try {
            const response = await apiClient.get(`${this.endpoint}/${id}`)
            const result = response.data.result
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- POST ORDERS ------- //

    public createOrder = async (order: Omit<IOrder, 'idOrder' | 'user' >): Promise<IOrder> => {
        try {
            const response = await apiClient.post(this.endpoint, order)
            const result = this.transformIOrder(response.data.result)
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- PUT ORDER ------- //

    public updateOrder = async (id: number, order: Partial<IOrder>): Promise<IOrder> => {
        try {
            const response = await apiClient.put(`${this.endpoint}/${id}`, order)
            const result = this.transformIOrder(response.data.result)
            return result

        } catch (error) {
            console.log('Error: ', error)
            throw error
        }
    }

    // ------- DELETE ORDERS ------- //

    public deleteOrder = async (id: number): Promise<void> => {
            try {
                const result = await apiClient.delete(`${this.endpoint}/${id}`)
                console.log(`Order deleted: `, result)
            } catch (error) {
                console.log('Error: ', error)
                throw error
            }
    }
    
    // ------- TRANSFORMER ------- //

    private transformIOrder(order: IOrder): IOrder {
        return {
            idOrder: order.idOrder,
            numMeals: order.numMeals,
            idUser: order.idUser,
            user: order.user,
            date: order.date,
            hour: order.hour,
            place: order.place,
            status: order.status,
            totalPrice: order.totalPrice,
            orderItems: order.orderItems
        }
    }
}
