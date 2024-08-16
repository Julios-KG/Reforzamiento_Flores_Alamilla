import useGetQuotes from "../../../hooks/quotes/useGetQuotes";
import { useEffect, useState } from 'react';
import QuoteCard from './QuoteCard';
import usePutQuote from "../../../hooks/quotes/usePutQuotes";
import { IQuote } from "../../../interfaces/IQuote";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuoteCardSkeleton from "./QuoteCardSkeleton";

function QuotesView() {
 
    const { quote, loading, error, getQuotes } = useGetQuotes('/Quote')
    const { putQuote } = usePutQuote('/Quote');

    const [selectedQuote, setSelectedQuote] = useState<any>(null);
    const [price, setPrice] = useState(0);
        
    const handleAssignPrice = (idQuote: number) => {
        const quo = quote.find((q) => q.idQuote === idQuote);
        setSelectedQuote(quo);
        console.log(quo);
        
        // logic to open modal for assigning price
  };

  const calculateTotal = (quo: any) => {
    
        let subtotal: number = 0;
        quo.quoteItems.map((item: any) => {
            let total = item.meal.price * item.quantity;
            subtotal += total;
        });

        return Math.round(subtotal);

    };

    const handleUpdatePrice = async(quote: IQuote, price: number) => {

        try {

            const postData = {
                ...quote,
                status: 1,
                totalPrice: price,
            }
    
            await putQuote(postData);
            getQuotes();
            toast.success('Precio asignado con exito!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        } catch (error) {
            console.log(error);
            toast.error('Ups! Ocurrio un error', {});
        }
    
    }

  useEffect(() => {
    console.log(quote);
    
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Cotizaciones</h1>
        <ToastContainer />

        { loading ? 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuoteCardSkeleton/><QuoteCardSkeleton/>
          </div>
          :
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quote.map((quote) => (
              <QuoteCard key={quote.idQuote} quote={quote} onAssignPrice={handleAssignPrice} />
            ))}
          </div>
        }

      {selectedQuote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Asignar Precio para {selectedQuote.place}</h2>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder={`Precio sugerido: $${calculateTotal(selectedQuote)}`}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                onClick={() => setSelectedQuote(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => {
                  // logic to save price
                  setSelectedQuote(null);
                  handleUpdatePrice(selectedQuote, price);
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotesView;
