import { useState } from 'react';
import { ICategory } from '../../interfaces/ICategory';

const Modal = ({ meal, categories, onClose, onSave, onUpdate }: any) => {
  const [title, setTitle] = useState(meal ? meal.title : '');
  const [price, setPrice] = useState(meal ? meal.price : '');
  const [description, setDescription] = useState(meal ? meal.description : '');
  const [ingredients, setIngredients] = useState(meal ? meal.ingredients : '');
  const [status, setStatus] = useState(meal ? meal.status : 'Disponible');
  const [urlImage, setUrlImage] = useState(meal ? meal.urlImage : '');
  const [idCategory, setIdCategory] = useState(meal ? meal.idCategory : 1);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!title || !status || !urlImage || !idCategory) {
      setError('All fields are required');
      return;
    }

    const updatedDish = {
      description,
      ingredients,
      title,
      price,
      status,
      urlImage,
      idCategory: parseInt(idCategory),
    };
    onSave(updatedDish);
  };

  const handleEdit = () => {
    if (!title || !status || !urlImage || !idCategory) {
      setError('All fields are required');
      return;
    }

    const updatedDish = {
      description,
      ingredients,
      title,
      price,
      status,
      urlImage,
      idCategory: parseInt(idCategory),
      idMeal: meal.idMeal,
    };
    
    onUpdate(updatedDish);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          {meal ? 'Editar Platillo' : 'Nuevo Platillo'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 gap-4 mb-4">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-bold" htmlFor="title">
                Titulo:
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-2 border rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-bold" htmlFor="price">
                Precio:
              </label>
              <input
                type="number"
                id="price"
                className="w-full px-4 py-2 border rounded-lg"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-bold" htmlFor="description">
                Descripción:
              </label>
              <textarea
                name="description"
                id="description"
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-bold" htmlFor="ingredients">
                Ingredientes:
              </label>
              <textarea
                name="ingredients"
                id="ingredients"
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-bold">Categoria:</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={idCategory}
                onChange={(e) => setIdCategory(parseInt(e.target.value))}
              >
                {categories.map((category: ICategory) => (
                  <option key={category.idCategory} value={category.idCategory}>
                    {category.nameCategory}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-bold">Estado:</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Disponible">Disponible</option>
                <option value="No Disponible">No disponible</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-bold" htmlFor="url">
            URL de la Imagen:
          </label>
          <textarea
            name="url"
            id="url"
            className="w-full px-4 py-2 border rounded-lg"
            rows={2}
            value={urlImage}
            onChange={(e) => setUrlImage(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            onClick={ meal ? handleEdit : handleSave }
          >
            {meal ? 'Guardar' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
