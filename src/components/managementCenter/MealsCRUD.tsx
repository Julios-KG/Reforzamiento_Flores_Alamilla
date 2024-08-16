import { useState } from "react";
import useGetMeal from "../../hooks/meals/useGetMeals";
import usePostMeal from "../../hooks/meals/usePostMeals";
import usePutMeal from "../../hooks/meals/usePutMeals";
import { IMeal } from "../../interfaces/IMeal";
import CardsCRUD from "./CardsCRUD";
import CardCRUDSkeleton from "./CardCRUDSkeleton";
import { MagicMotion } from "react-magic-motion";
import { IconCirclePlus } from '@tabler/icons-react';
import Modal from "./EditModal";
import useDeleteMeal from "../../hooks/meals/useDeleteMeals";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//! Remplazar por los de la API
const categories = [
    { idCategory: 1, nameCategory: 'Entrada' },
    { idCategory: 2, nameCategory: 'Aperitivo' },
    { idCategory: 3, nameCategory: 'Bebida' },
    { idCategory: 4, nameCategory: 'Postre' }
  ];

function MealsCRUD() {

    const {meal, loading, error, getMeals} = useGetMeal('/Meal')
    const { postNewMeal } = usePostMeal('/Meal')
    const { putMeal } = usePutMeal('/Meal')
    const { deleteMeal } = useDeleteMeal('/Meal')


    const [errors, setErrors] = useState<Partial<Omit<IMeal, 'idMeal'>>>({})

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState<IMeal | {}>({});

    const handleEdit = (meal: IMeal) => {
        console.log(`Editar platillo con ID: ${meal.idMeal}`);
        setSelectedDish(meal);
        setIsModalOpen(true);
      };

    const handleSave = async(meal: Omit<IMeal, 'idMeal' | 'category'> ) => {
    
        if (!meal.title || !meal.status || !meal.urlImage || !meal.idCategory) {
            console.log('All fields are required');
            return;
        }
    
        try {
            await postNewMeal(meal)
            console.log('Meal sent:', meal)
            setErrors({})
            getMeals()
            toast.success('Platillo agregado con exito!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } catch (error) {
            console.log(error)
            toast.error('Ups! Ocurrio un error', {})
        }
    
        setIsModalOpen(false);
    };

    const handleUpdate = async(meal: IMeal) => {
        try {
            await putMeal(meal)
            console.log('Meal updated:', meal)
            setErrors({})
            getMeals()
            toast.success('Platillo actualizado con exito!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch (error) {
            console.log(error)
            toast.error('Ups! Ocurrio un error', {})
        }

        setIsModalOpen(false);
    };

        const handleAddNew = () => {
            setSelectedDish(null);
            setIsModalOpen(true);
        };

    
      const handleDelete = (id: number) => {
        console.log(`Eliminar platillo con ID: ${id}`);

        try {
            deleteMeal(id)
            toast.success( 'Platillo eliminado con exito!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })

            setTimeout(() => {
                getMeals()
            }, 500)

        } catch (error) {
            console.log(error)
            toast.error('Ups! Ocurrio un error', {})
        };
    }
    
      const filteredDishes = meal.filter(dish =>
        dish.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || dish.idCategory === parseInt(selectedCategory))
      );

    if (error) return <div> Ocurrio un error: {error.message} </div>


    return ( 
        <>
            <div className="flex justify-center mb-8 space-x-4">
                <input
                type="text"
                placeholder="Buscar..."
                className="w-1/3 px-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                className="w-1/3 px-4 py-2 border rounded-lg"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                >
                <option value="">Todas las Categorias</option>
                {categories.map(category => (
                    <option key={category.idCategory} value={category.idCategory}>
                    {category.nameCategory}
                    </option>
                ))}
                </select>
                <button
                    className="flex bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                    onClick={handleAddNew}
                >
                    <IconCirclePlus />
                    Agregar Platillo
                </button>
                <ToastContainer />
            </div>
            <div>

                { loading ? 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CardCRUDSkeleton/><CardCRUDSkeleton/>
                </div> :
                    <MagicMotion>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredDishes.map(dish => (
                            <CardsCRUD 
                                key={dish.idMeal} 
                                meal={dish} 
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                            ))}
                        </div>
                    </MagicMotion>
                
                }

            {isModalOpen && (
                    <Modal 
                    meal={selectedDish}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    onUpdate={handleUpdate}
                    categories={categories}
                    />
                )}

            </div>
            
        </>
     );
}

export default MealsCRUD;