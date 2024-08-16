import { IconEdit, IconTrash } from '@tabler/icons-react';


function CardsCRUD( {meal, handleEdit, handleDelete}: any ) {

    const { title, description, ingredients, price, status, urlImage, idMeal } = meal

    return ( 
      <div className="w-full flex items-center bg-white shadow-md rounded-lg overflow-hidden my-2">
        <img className="w-32 h-32 object-cover" src={urlImage} alt={title} />
        <div className="flex-grow p-4">
          <div className="font-bold text-sm md:text-lg">{title}</div>
          <p className={` text-xs sm:text-sm font-semibold ${status === 'Disponible' ? 'text-green-500' : 'text-red-500'}`}>{status}</p>
        </div>
        <div className="flex-shrink-0 p-4 flex space-x-2">
          <button 
            onClick={() => handleEdit(meal)}
            className="bg-yellow-500 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded hover:bg-yellow-600 transition duration-300">
            <IconEdit />
          </button>
          <button 
            onClick={() => handleDelete(idMeal)}
            className="bg-red-400 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded hover:bg-red-600 transition duration-300">
            <IconTrash />
          </button>
        </div>
      </div>
     );
}

export default CardsCRUD;