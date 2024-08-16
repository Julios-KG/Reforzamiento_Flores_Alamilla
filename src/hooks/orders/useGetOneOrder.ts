import { useEffect, useState } from 'react'
import OrderService from '../../services/OrderService'
import { IOrder } from '../../interfaces/IOrder'

const useGetOneOrder = (orderId: number) => {
    const [order, setOrder] = useState<IOrder | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    const orderService = new OrderService(`/order/${orderId}`)

    const getOneOrder = async () => {
        try {
            const result = await orderService.getOneOrder(orderId)
            setOrder(result)
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOneOrder()
    }, [orderId])

    return { order, loading, error, getOneOrder }
}

export default useGetOneOrder;