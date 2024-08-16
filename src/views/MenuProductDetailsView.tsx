import useGetOneMeals from "../hooks/meals/useGetOneMeals";
import { useParams, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import ProductDetailsSkeleton from "../components/skeletons/ProductDetailsSkeleton";
import SideModal from "../components/SideModal";
import { IMeal } from "../interfaces/IMeal";

const MenuProductDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const { meal, loading, error } = useGetOneMeals("/Meal", parseInt(id ?? ""));
  const [sideModalOpen, setSideModalOpen] = useState(false);
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<IMeal[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (loading) return <ProductDetailsSkeleton />;
  if (error) return <div>Ocurrió un error: {error.message}</div>;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + delta));
  };

  const updateCart = (update: (prevCart: IMeal[]) => IMeal[]) => {
    setCart(prevCart => {
      const updatedCart = update(prevCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const addToCart = () => {
    updateCart(prevCart => {
      const existingItem = prevCart.find(item => item.idMeal === meal?.idMeal);
      if (existingItem) {
        return prevCart.map(item =>
          item.idMeal === meal?.idMeal
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...meal, quantity }];
    });
    document.body.classList.add('loading'); 
    setTimeout(() => {
      window.location.reload();
    }, 5); 
  };
  

  const removeFromCart = () => {
    updateCart(prevCart => {
      const existingItem = prevCart.find(item => item.idMeal === meal?.idMeal);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevCart.map(item =>
            item.idMeal === meal?.idMeal
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
        return prevCart.filter(item => item.idMeal !== meal?.idMeal);
      }
      return prevCart;
    });
    document.body.classList.add('loading'); 
    setTimeout(() => {
      window.location.reload();
    }, 5); 
  };

  const handleRemoveFromCartInModal = (idMeal: number) => {
    updateCart(prevCart => prevCart.filter(item => item.idMeal !== idMeal));
    if (cart.length === 1) {
      toggleSideModal(); // Cierra el modal si era el último elemento
    }
  };

  const toggleSideModal = () => {
    setSideModalOpen(!sideModalOpen);
  };

  const goToMenu = () => {
    navigate("/menu");
  };

  const itemInCart = cart.find(item => item.idMeal === meal?.idMeal);

  return (
    <>
      <section
        ref={ref}
        className={`py-5 md:py-24 ${
          inView ? "animate-fade-down" : "opacity-0 translate-y-10"
        } bg-secundary py-16`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/2 mb-8 lg:mb-0 max-w-lg">
            <div className="w-full h-72 md:h-96 relative">
              <img
                src={meal?.urlImage}
                alt={meal?.title}
                className="object-cover w-full h-full rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <div className="flex items-center space-x-4 mb-2">
              <span
                className={`${
                  meal?.status === "Disponible" ? "bg-green-300" : "bg-red-300"
                } rounded-full text-sm py-1 px-2`}
              >
                {meal?.status}
              </span>
              <button className="btn-red" onClick={goToMenu}>
                Volver al menú
              </button>
            </div>
            <h1 className="text-5xl font-semibold my-1 playfair">
              {meal?.title}
            </h1>
            <p className="text-gray-600 mb-4 text-sm">
              Código de producto: {meal?.idMeal}
            </p>
            <p className="text-gray-600 mb-4">{meal?.description}</p>

            <table className="table-auto w-full mb-4">
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="py-2 text-gray-600 font-semibold">
                    Ingredientes
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {meal?.ingredients}
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 text-gray-600 font-semibold">
                    Categoría
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {meal?.category?.nameCategory ?? "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-4xl font-semibold mb-4 text-primary">
              $ {meal?.price} <span className="text-sm">MXN</span>
            </p>
            <div className="flex items-center space-x-4">
              <button className="btn-red" onClick={addToCart}>
                Agregar al carrito
              </button>
              {itemInCart && itemInCart.quantity > 1 && (
                <button className="btn-red" onClick={removeFromCart}>
                  Quitar del carrito
                </button>
              )}
              <div className="flex items-center border rounded">
                <button
                  className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-l focus:outline-none focus:shadow-outline"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center bg-gray-100 border-t border-b border-gray-300 p-1 focus:outline-none"
                />
                <button
                  className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-r focus:outline-none focus:shadow-outline"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SideModal
        isOpen={sideModalOpen}
        onClose={toggleSideModal}
        cart={cart}
        onRemoveItem={handleRemoveFromCartInModal}
      />
    </>
  );
};

export default MenuProductDetailsView;