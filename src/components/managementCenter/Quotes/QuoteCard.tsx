import React from 'react';
import { IMeal } from '../../../interfaces/IMeal';

const QuoteCard = ({ quote, onAssignPrice }: any) => {
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'Cotizado';
      case 2:
        return 'Aprobado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4 ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{quote.place}</h3>
        <span className={`px-3 py-1 rounded ${quote.status === 0 ? 'bg-yellow-300' : quote.status === 1 ? 'bg-green-300' : 'bg-red-300'}`}>
          {getStatusText(quote.status)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p><strong>Usuario:</strong> {quote.user.name}</p>
          <p><strong>Correo:</strong> <br /> {quote.user.email}</p>
        </div>
        <div>
          <p><strong>Fecha:</strong> {new Date(quote.date).toLocaleDateString()}</p>
          <p><strong>Num. Platillos:</strong> {quote.quoteItems.length}</p>           
        </div>
      </div>
      <div className="mb-7 h-52 overflow-y-auto">
        <h4 className="text-lg font-semibold mb-2">Platillos:</h4>
        <ul className="space-y-4">
          {quote.quoteItems.map((item: any, index: number) => (
            <li key={index} className="flex items-center">
              <img src={item.meal.urlImage} alt={item.meal.name} className="w-16 h-16 object-cover rounded mr-4" />
              <div>
                <p className="font-semibold">{item.meal.title}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.meal.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <button
          className={`${ quote.totalPrice > 0 ? "bg-[#474747] text-white py-2 px-4 rounded hover:bg-[#636363]" : "bg-primary text-white py-2 px-4 rounded hover:bg-[#de136891]" }`}
          onClick={() => onAssignPrice(quote.idQuote)}
        >
          { quote.totalPrice > 0 ? 'Cambiar Precio' : 'Asignar Precio'}
        </button>
          { quote.totalPrice > 0 && <p className=" flex text-lg font-bold text-center items-center">Subtotal: ${quote.totalPrice}</p> }
      </div>
    </div>
  );
};

export default QuoteCard;
