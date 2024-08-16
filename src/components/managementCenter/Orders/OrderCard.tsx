import { IOrder } from '../../../interfaces/IOrder';
import { OrderItem } from '../../../interfaces/IOrder';

interface OrderCardProps {
    order: IOrder;
    }

const OrderCard = ({ order }: OrderCardProps) => {
  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return 'Aprobado';
      case 2:
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{order.place}</h3>
        <span className={`px-3 py-1 rounded ${order.status === 1 ? 'bg-green-300' : order.status === 2 ? 'bg-yellow-300' : 'bg-red-300'}`}>
          {getStatusText(order.status)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p><strong>Usuario:</strong> {order.user.name}</p>
          <p className='text-xs' ><strong className='text-base' >Correo:</strong> {order.user.email}</p>
        </div>
        <div>
          <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString()}</p>
          <p><strong>Hora:</strong> {order.hour}</p>
        </div>
      </div>
      <div className="mb-4 h-52 overflow-y-auto">
        <h4 className="text-lg font-semibold mb-2">Platillos: ({ order.numMeals }) </h4>
        <ul className="space-y-4">
          {order.orderItems.map((item: OrderItem, index: number) => (
            <li key={index} className="flex items-center">
              <img src={item.meal.urlImage} alt={item.meal.title} className="w-16 h-16 object-cover rounded mr-4" />
              <div>
                <p className="font-semibold">{item.meal.title}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.meal.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end">
        <p className="text-lg font-bold">Total: ${order.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderCard;
