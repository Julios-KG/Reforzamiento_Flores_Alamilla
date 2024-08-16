import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";
import { IOrder } from "../../interfaces/IOrder";

const useGetOrders = (endpoint: string) => {

    const [order, setOrder] = useState<IOrder[] | [] >([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    const orderService = new OrderService(endpoint)
    
    const getOrders = async () => {
        try {
            const result = await orderService.getOrders()
            setOrder(result)
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)    
        }
    }

    useEffect(() => {
        getOrders()
    },[endpoint])

    return {order, loading, error, getOrders}
}

export default useGetOrders