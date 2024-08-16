import { Link } from 'react-router-dom';
import { IMeal } from '../interfaces/IMeal';
import CardSkeleton from './skeletons/CardSkeleton';
import React from 'react';

interface CardComponentProps {
  meals: IMeal[] | null
  showMore: boolean
  loading: boolean
}


const CardComponent: React.FC<CardComponentProps> = ({ meals, showMore, loading }) => {

  if (loading) return <CardSkeleton />

  let countedMeals 
  
  if (!showMore) {
    countedMeals = meals ? meals.slice(0, 12) : []
  } else {
    localStorage.setItem('showMore', 'true')
    countedMeals = meals
  }

  return (
    <>
      {countedMeals && countedMeals.map((ml: IMeal) => (
        <React.Fragment key={ml.idMeal}> 
        
          <Link to={`/Menu/${ml.idMeal}`} className="hidden md:grid bg-white rounded-lg group shadow-lg border-2 border-zinc-300 pb-2 overflow-hidden transition-all duration-500 hover:border-red-400">
              
              <div className='relative overflow-hidden'>
{/*                 <div className='absolute top-0 right-0'>
                  <IconCircle fill='green' color='green' />
                </div> */}
                <img src={ml.urlImage} alt="" className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"/>
                <div className="absolute inset-0 flex items-center justify-center bg-red-400 bg-opacity-50 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Ver detalles...
                </div>
              </div>
              <div className="p-6 flex flex-col items-center space-y-3">
                  <h3 className="text-primary font-bold text-xl">${ml.price}</h3>
                  <p className="text-lg font-semibold text-center group-hover:text-primary duration-500">{ml.title}</p>
                  <p className="text-xs lg:text-base font-light text-gray-600 text-center group-hover:text-primary duration-500">{ml.description}</p>
              </div>
          </Link>
          {/** SMALL CARDS */}
          <Link to={`/Menu/${ml.idMeal}`} className="w-36 sm:w-4/5 sm:h-64 md:hidden bg-white rounded-lg group shadow-lg border-2 border-zinc-300 pb-2 overflow-hidden transition-all duration-500 hover:border-red-400">
            <div className='relative overflow-hidden'>
              <img src={ml.urlImage} alt="" className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"/>
              <div className="absolute inset-0 flex items-center justify-center bg-red-400 bg-opacity-50 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Ver detalles...
              </div>
            </div>
            <div className="p-6 flex flex-col items-center space-y-3">
                <h3 className="text-primary font-bold text-xs sm:text-sm">${ml.price}</h3>
                <p className="text-xs sm:text-sm font-semibold text-center group-hover:text-primary duration-500">{ml.title}</p>
            </div>
          </Link>
        </React.Fragment>
      ))
      }
    </>
  );
};

export default CardComponent;
