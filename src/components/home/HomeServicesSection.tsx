import { IconCoffee, IconSalad, IconGlassCocktail, IconCake } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const services = [
    {
        icon: <IconCoffee size={40} />,
        title: "Entradas",
        description: "Frescas ensaladas y sopas reconfortantes para comenzar tu experiencia culinaria."
    },
    {
        icon: <IconSalad size={40} />,
        title: "Aperitivos",
        description: "Pequeñas porciones llenas de sabor, perfectas para compartir y disfrutar."
    },
    {
        icon: <IconGlassCocktail size={40} />,
        title: "Bebidas",
        description: "Desde vinos y cócteles hasta refrescos naturales para acompañar cada plato."
    },
    {
        icon: <IconCake size={40} />,
        title: "Postres",
        description: "Tartas, mousses y postres tradicionales para cerrar con broche de oro."
    }
];

const HomeServicesSection = () => {

    const [animationPlayed, setAnimationPlayed] = useState(false)

    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    useEffect(() => {
        const animationPlayed = localStorage.getItem('animationPlayed')
        if (animationPlayed) setAnimationPlayed(true) 
    }, [])

    useEffect(() => {
        if (inView && !animationPlayed) {
            localStorage.setItem('animationPlayed', 'true')
            setAnimationPlayed(true)
        }
    }, [inView, animationPlayed])

    return (
        <section ref={ref} className={`${inView && !animationPlayed ? 'animate-fade-left animate-duration-[2000ms] animate-delay-100' : ''} py-12 my-12`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-5xl playfair font-semibold text-center mb-12">Servicios</h2>
                <div className="grid gap-8 justify-items-center grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <div key={index} className="p-6 max-w-56 sm:max-w-full rounded-lg shadow-md hover:shadow-xl transition-all duration-500 border-2 pb-7 pt-10 border-gray-200">
                            <div className="flex items-center justify-center mb-4">
                                <i className='btn-icon'>
                                    {service.icon}
                                </i>
                            </div>
                            <h3 className="text-md sm:text-xl font-semibold text-center mb-2">{service.title}</h3>
                            <p className="text-gray-600 sm:flex hidden text-xs md:text-base text-center mb-10">{service.description}</p>
                            <div className="text-center">
                                <Link to={'/Menu'} className="text-pink-500 text-xs sm:text-base font-semibold hover:underline">Explorar menú</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeServicesSection;
