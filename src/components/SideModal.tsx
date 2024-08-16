import { IconX, IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IMeal } from "../interfaces/IMeal";
import useGetMealsByIds from "../hooks/meals/useGetMealsByIds";

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: IMeal[];
  onRemoveItem: (idMeal: number) => void;
}

const SideModal: React.FC<SideModalProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
}) => {
  const [cartItemIds, setCartItemIds] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<IMeal[]>([]);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(false); // Nuevo estado
  const { meals, loading, error } = useGetMealsByIds("/Meal", cartItemIds);

  useEffect(() => {
    if (isOpen) {
      setCartItemIds(cart.map(item => item.idMeal));
    }
  }, [isOpen, cart]);

  useEffect(() => {
    if (meals.length > 0) {
      const updatedCartItems = meals.map((meal) => {
        const cartItem = cart.find((item) => item.idMeal === meal.idMeal);
        return { ...meal, quantity: cartItem?.quantity || 0 }; // Establecer 0 cuando no se encuentra
      });
      setCartItems(updatedCartItems);

      // Verificar si el carrito está vacío
      if (updatedCartItems.every(item => item.quantity === 0)) {
        setIsCartEmpty(true);
      } else {
        setIsCartEmpty(false);
      }
    }
  }, [meals, cart]);

  const handleRemove = (idMeal: number) => {
    onRemoveItem(idMeal);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } bg-gradient-to-r from-transparent to-black bg-opacity-50 flex justify-end`}
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white p-4 w-96 h-full shadow-lg flex flex-col">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-2xl font-bold">Mi carrito</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IconX size={24} />
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : error ? (
          <p className="text-center text-gray-500">Error: {error.message}</p>
        ) : isCartEmpty || cartItems.length === 0 ? (
          <p className="text-center text-gray-500">El carrito está vacío</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.idMeal} className="flex items-center mb-4">
              <img
                src={item.urlImage || "https://via.placeholder.com/100"}
                alt={item.title}
                className="w-20 h-20 object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-lg font-semibold">${item.price}</p>
                <p className="text-sm text-gray-500">
                  Cantidad: {item.quantity || 0}
                </p>
              </div>
              <IconTrash
                className="ml-auto text-gray-500 hover:text-red-700 cursor-pointer"
                onClick={() => handleRemove(item.idMeal)}
              />
            </div>
          ))
        )}

        <div className="border-t pt-4 mt-auto">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-semibold">${totalPrice.toFixed(2)} MXN</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Descuentos</span>
            <span className="text-sm font-semibold">N/A</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">${totalPrice.toFixed(2)} MXN</span>
          </div>
          <div className="flex items-center justify-center">
            <Link
              to={"/finalizar-compra"}
              className="btn-red w-auto px-4 py-2 text-center text-xl rounded-md"
              onClick={onClose}
            >
              Ver carrito y pagar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideModal;