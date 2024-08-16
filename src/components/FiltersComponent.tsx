import useGetCategory from "../hooks/category/useGetCategory";
import Error404View from "../views/Error404View";
import { ICategory } from "../interfaces/ICategory";
import FiltersSkeleton from "./skeletons/FiltersSkeleton";

interface FilterComponentPropos {
    selectedCategory: number | null,
    setSelectedCategory: (category: number | null) => void,
}

const FiltersComponent: React.FC<FilterComponentPropos> = ({ selectedCategory, setSelectedCategory }) => {

    const { category, loading, error } = useGetCategory('/Category')

    if (loading) return <FiltersSkeleton />
    if (error) return <div> <Error404View /> error: {error.message}</div>

    return (  
        <>
            <nav className="flex md:flex-row md:space-x-4 justify-center">
                <button  
                    className={`text-xs mx-1 md:px-7 md:hover:bg-primary ${selectedCategory === null ? 'text-primary md:px-8 md:btn-red' : 'md:btn-black md:text-zinc-500 md:border-zinc-300'}`}
                    onClick={() => setSelectedCategory(null)}
                >
                    Todos
                </button>
                {category && category.map((cat: ICategory) => (
                    <button 
                        key={cat.idCategory} 
                        className={`text-xs mx-1 md:px-7 md:hover:bg-primary ${selectedCategory === cat.idCategory ? 'text-primary md:px-8 md:btn-red' : 'md:btn-black md:text-zinc-500 md:border-zinc-300'}`}
                        onClick={() => setSelectedCategory(cat.idCategory)}
                    >
                        {cat.nameCategory}
                    </button>
                ))}
            </nav>
        </>
    );
}

export default FiltersComponent;