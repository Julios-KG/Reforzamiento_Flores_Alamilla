import React, { useEffect, useState } from 'react';
import useGetOrders from '../hooks/orders/useGetOrders';
import { IOrder } from '../interfaces/IOrder';
import { useParams } from 'react-router-dom';

const ThankYouView = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, order: orders, getOrders } = useGetOrders('/Order');
  const [latestOrder, setLatestOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    getOrders();
  }, [id]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const order = orders[orders.length - 1];
      setLatestOrder(order);
    }
  }, [orders]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Ocurrió un error: {error.message}</div>;

  if (!latestOrder) {
    return <div>No se encontraron datos para esta orden.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 playfair">Checkout</h1>
          <div className="flex items-center mb-4">
            <div className="text-green-500 text-2xl mr-2">✔</div>
            <h2 className="text-2xl font-semibold">Orden: #{latestOrder.idOrder}</h2>
          </div>
          <p className="text-xl">Gracias {latestOrder.user?.name || 'Usuario'}!</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Order Updates</h3>
          <p className="text-gray-600">
            You will receive order and shipping updates via email.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-xl font-bold mb-4">Datos de usuario</h3>
            <div className="mb-4">
              <h4 className="font-semibold">Dirección</h4>
              <p>{latestOrder.user?.name || 'N/A'}</p>
              <p>{latestOrder.place || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-semibold">Método de pago</h4>
              <p>Mercado Pago</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-xl font-bold mb-4">Datos de orden</h3>
            {latestOrder.orderItems ? (
              latestOrder.orderItems.map((item) => (
                <div key={item.idOrderItem} className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src={item.meal.urlImage || "https://via.placeholder.com/60"}
                      alt={item.meal.title}
                      className="w-16 h-16 rounded-md object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{item.meal.title}</h4>
                      <p className="text-gray-600">${item.meal.price}</p>
                    </div>
                  </div>
                  <span>x {item.quantity}</span>
                </div>
              ))
            ) : (
              <p>No se encontraron elementos en esta orden.</p>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${latestOrder.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Descuentos</span>
                <span className="font-semibold">N/A</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${latestOrder.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-gray-600">
            <span className="mr-1">¿Necesitas ayuda?</span>
            <a href="#" className="text-blue-500 underline">
              Contáctanos
            </a>
          </div>
          <button className="btn-black">Continuar comprando</button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouView;
