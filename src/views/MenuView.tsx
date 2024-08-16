import { useInView } from "react-intersection-observer";
import CardComponent from "../components/CardComponent";
import FiltersComponent from "../components/FiltersComponent";
import Error404View from "./Error404View";
import { useEffect, useState } from "react";
import { IMeal } from "../interfaces/IMeal";
import useGetMeal from "../hooks/meals/useGetMeals";


const MenuView = () => {

  const {ref, inView} = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const { meal, error, loading } = useGetMeal('/Meal')
  const [showMore, setShowMore] = useState(false)

  const [filteredMeals, setFilteredMeals] = useState<IMeal[] | null>([])

  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredMeals(meal)
    } else {
      setFilteredMeals(meal && meal.filter((ml: IMeal) => ml.idCategory === selectedCategory))
    }

    const current = localStorage.getItem('showMore')
    if (current) {
      setShowMore(true)
    }
  }, [selectedCategory, meal])

  if (error) return <div> <Error404View /> Ocurrio un error: {error.message} </div>

  const handleShowMore = () => {
    setShowMore(true)
  }

  return (
    <section 
      ref={ref}
      className={`${inView ? 'animate-fade-up' : 'opacity-0 translate-y-10'} max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-3xl playfair sm:text-4xl md:text-5xl lg:text-7xl mb-6 backdrop-blur-sm bg-white rounded-r-lg bg-opacity-10 p-3 md:backdrop-blur-0 md:bg-opacity-0">
          Nuestro Menú
        </h1>
        <p className="text-xs md:text-lg mb-8">
          Consideramos los mejores platillos para que cuentes con una
          experiencias inigualable
        </p>
        <FiltersComponent 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          <CardComponent 
            loading={loading}
            meals={filteredMeals}
            showMore={showMore}
          />
      </div>
      <div className="flex justify-center mt-10">
        <button onClick={handleShowMore} className={`${showMore ? 'hidden' : ''} btn-red `}>Ver más platillos</button>
      </div>
    </section>
  );
};

export default MenuView;
