import { useInView } from "react-intersection-observer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IconTrash } from "@tabler/icons-react";
import { IMeal } from "../interfaces/IMeal";
import useGetMealsByIds from "../hooks/meals/useGetMealsByIds";
import usePostQuote from "../hooks/quotes/usePostQuotes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IUser } from "../interfaces/IUser";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from "axios";
import { IMercadoPagoItem } from "../interfaces/IMercadoPagoItem";

const CompletePurchaseView = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [cartItemIds, setCartItemIds] = useState<number[]>([]);
  const [cart, setCart] = useState<IMeal[]>([]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const { meals, loading, error } = useGetMealsByIds("/Meal", cartItemIds);
  const { postNewQuote } = usePostQuote("/Quote");
  const [direccion, setDireccion] = useState('');
  const [hora, setHora] = useState('');
  const [fecha, setFecha] = useState('');
  const [usuario, setUsuario] = useState<IUser>();
  const navigate = useNavigate()

  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      setCartItemIds(cartItems.map((item: IMeal) => item.idMeal));
    }
    const user = localStorage.getItem("userInfo") || "";
    if (user) {
      const userInfo = JSON.parse(user);
      setUsuario(userInfo)
    } else {
      navigate('/SignIn')
    }
  }, [navigate]);

  useEffect(() => {
    if (meals.length > 0) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cartItems: IMeal[] = JSON.parse(savedCart);
        const updatedCart = meals.map((meal) => ({
          ...meal,
          quantity:
            cartItems.find((item) => item.idMeal === meal.idMeal)?.quantity ||
            1,
        }));
        setCart(updatedCart);
      }
    }
  }, [meals]);

  const updateCartInLocalStorage = (updatedCart: IMeal[]) => {
    const cartItems = updatedCart.map((item) => ({
      idMeal: item.idMeal,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const handleQuantityChange = (idMeal: number, increment: boolean) => {
    const updatedCart = cart.map((item) => {
      if (item.idMeal === idMeal) {
        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  const handleRemoveItem = (idMeal: number) => {
    const updatedCart = cart.filter((item) => item.idMeal !== idMeal);
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const discount = 0;
    return (subtotal - discount).toFixed(2);
  };

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const quoteItems = cart.map((item) => ({
      idMeal: item.idMeal,
      quantity: item.quantity,
    }));

    
    const fechaHora = `${fecha}T${hora}:00.000Z`;
    const date = new Date(fechaHora);
    
    const postData = {
      place: direccion,
      numMeals: 0,
      date: date,
      idUser: usuario?.idUser || 0,
      status: 0,
      totalPrice: 0,
      quoteItems: quoteItems,
    }

    postNewQuote(postData);
    setShowQuoteModal(false);
    toast.success('¡Cotización enviada con éxito!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  // Public Key De Jair
/*   initMercadoPago('TEST-80bd44fe-236a-4de8-94a6-94c24f6e6891', {
    locale: "es-MX",
  }); */

  // Public Key De Prueba de Producción
  initMercadoPago('APP_USR-6ce313d2-9bb5-4831-9a7a-e49b48614da0', {
    locale: "es-MX",
  });

  const createPreference = async () => {
    try {

      const postData: IMercadoPagoItem[] = cart.map((meal) => ({
        id: meal.idMeal.toString(),
        title: meal.title,
        description: meal.title,
        pictureUrl: meal.urlImage,
        quantity: meal.quantity,
        unitPrice: Math.round(Number(meal.price)), 
      }));
      
      const response = await axios.post(`https://www.delicias.somee.com/MercadoPago/create-preference/${usuario?.idUser}`, postData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
      console.log(response.data);
  
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
    }
  }

  const handlePayment = async () => {
    const preferenceId = await createPreference();
    if (preferenceId) {
      setPreferenceId(preferenceId);
      console.log('ID Obtenido: ',preferenceId);
    }
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowQuoteModal(false)
    }
  }

  return (
    <>
    
      <section
        ref={ref}
        className={`${
          inView ? "animate-fade-up" : "opacity-0 translate-y-10"
        } max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8 `}
      >
        <ToastContainer />
        <div className={`${ showQuoteModal ? 'blur-sm' : '' }`} >
          <h1 className="text-3xl playfair sm:text-4xl md:text-5xl lg:text-7xl mb-6 backdrop-blur-sm bg-white rounded-r-lg bg-opacity-10 p-3 md:backdrop-blur-0 md:bg-opacity-0">
            Carrito de Compras
          </h1>
          <div className="flex flex-col lg:flex-row justify-between mb-6 space-x-4">
            <div
              className="flex flex-col w-full lg:w-3/4 mb-6 lg:mb-0 scroll-container"
              style={{ maxHeight: "350px", overflowY: "auto" }}
            >
              {loading ? (
                <p className="text-center text-gray-500">Cargando...</p>
              ) : error ? (
                <p className="text-center text-gray-500">
                  Error: {error.message}
                </p>
              ) : cart.length === 0 ? (
                <p className="text-center text-gray-500">El carrito está vacío</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.idMeal}
                    className="bg-white mx-2 border-2 border-zinc-300 shadow-lg p-4 rounded-lg flex flex-col lg:flex-row items-center mb-4"
                  >
                    <img
                      className="w-32 h-32 object-cover lg:w-20 lg:h-20 mr-4"
                      src={item.urlImage || "https://via.placeholder.com/100"}
                      alt={item.title}
                    />
                    <div className="flex flex-col w-full lg:w-auto lg:mr-auto">
                      <span className="font-semibold playfair">{item.title}</span>
                      <span className="text-sm text-gray-600">
                        {item.description}
                      </span>
                    </div>
                    <div className="flex items-center mt-4 lg:mt-0">
                      <button
                        className="bg-gray-300 text-gray-600 py-1 px-2 rounded-l"
                        onClick={() => handleQuantityChange(item.idMeal, false)}
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        className="bg-gray-300 text-gray-600 py-1 px-2 rounded-r"
                        onClick={() => handleQuantityChange(item.idMeal, true)}
                      >
                        +
                      </button>
                      <span className="ml-6 font-semibold text-lg">
                        ${item.price}
                      </span>
                      <IconTrash
                        className="ml-4 text-gray-600 hover:text-red-700 cursor-pointer"
                        onClick={() => handleRemoveItem(item.idMeal)}
                      ></IconTrash>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="w-full lg:w-1/4 p-4 border-2 border-zinc-300 shadow-lg rounded-lg">
              <h3 className="text-lg font-bold border-b pb-2 mb-4">
                Resumen del Pedido
              </h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${calculateSubtotal()} MXN</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Descuentos</span>
                <span>-$0.00 MXN</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Gastos de envío</span>
                <span>Gratis</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span className="font-bold">Total Estimado</span>
                <span className="">${calculateTotal()} MXN</span>
              </div>
              <div className="flex justify-between">
                <span className="font-light text-xs">
                  El precio final está sujeto a cambios.
                </span>
              </div>
              <div className="mt-6 flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <button
                    className="w-full btn-red"
                    onClick={() => setShowQuoteModal(true)}
                  >
                    Cotización
                  </button>
                  <button 
                    className="w-full btn-black"
                    onClick={() => handlePayment()}
                    >
                      Comprar
                  </button>
                </div>
                  { preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
                <Link to={"/Menu"} className="w-full btn-black text-center">
                  Elegir Más Productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showQuoteModal && (
          <div onClick={handleBackdropClick} className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white mt-20 p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg md:text-2xl font-bold mb-4">Formulario de Cotización</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-sm md:text-base font-medium text-gray-700">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="mt-1 py-3 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Ingresa tu dirección"
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm md:text-base font-medium text-gray-700">
                    Hora
                  </label>
                  <input
                    type="time"
                    className="mt-1 py-3 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setHora(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm md:text-base font-medium text-gray-700">
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="mt-1 py-3 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm md:text-base font-medium text-gray-700">
                    Notas adicionales
                  </label>
                  <textarea
                    className="mt-1 py-3 px-2 h-28 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Ingresa cualquier nota adicional"
                  ></textarea>
                </div>
                <div className="grid md:flex gap-2">
                  <button 
                    className="btn-red w-full"
                    onClick={(e: React.FormEvent) => handleCreateQuote(e)}
                    >
                      Enviar Cotización
                    </button>
                  <button
                    className="btn-black w-full"
                    onClick={() => setShowQuoteModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </>
  );
};

export default CompletePurchaseView;
