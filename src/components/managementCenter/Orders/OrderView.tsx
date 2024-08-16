import { useEffect, useState } from 'react';
import useGetOrders from '../../../hooks/orders/useGetOrders';
import OrderCard from './OrderCard';
import { IOrder } from '../../../interfaces/IOrder';
import OrderCardSkeleton from './OrderCardSkeleton';

const OrdersView = () => {

    const { order, loading, error, getOrders } = useGetOrders('/Order');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(order);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
      let result = order

      //Buscar por lugar
      if (searchTerm) {
        result = result.filter((order: IOrder) => {
          order.place.toLowerCase().includes(searchTerm.toLowerCase());
        });
      }
      
      //Filtrar por mes
      if (selectedMonth) {
        result = result.filter((order: IOrder) => {
          const date = new Date(order.date);
          return date.getMonth() + 1 === parseInt(selectedMonth);
        })
      }

      setFilteredOrders(result);

    }, [order, searchTerm, selectedMonth]);

    const handleSearch = (e: any) => {
      setSearchTerm(e.target.value);
    };
  
    const handleMonthChange = (e: any) => {
      setSelectedMonth(e.target.value);
    };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl font-bold mb-6 text-center">Ordenes</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar por lugar..."
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 ml-4"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">Todos los Meses</option>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>

      { loading ? 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OrderCardSkeleton/><OrderCardSkeleton/>
        </div>
        :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order: IOrder) => (
            <OrderCard key={order.idOrder} order={order} />
          ))}
        </div>
      }

    </div>
  );
};

export default OrdersView;
