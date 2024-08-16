import { IconChefHat, IconClock, IconReportMoney } from "@tabler/icons-react";
import { useInView } from 'react-intersection-observer';
import ChefImg from '../../assets/img/chef.webp';
import SopaImg from '../../assets/img/sopacamarones.webp';
import CarnesImg from '../../assets/img/platillocarne.webp';

const collage = [
    ChefImg,
    SopaImg,
    CarnesImg,
];

const beneficts = [
    { icon: <IconClock size={15} />, text: 'Compromiso con la satisfacción del cliente' },
    { icon: <IconChefHat size={15} />, text: 'Creatividad culinaria' },
    { icon: <IconReportMoney size={15} />, text: 'Innovación y Versatilidad' },
];

const HomeSection4 = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <>
            <section
                ref={ref}
                className={`bg-secundary px-12 md:px-24 mx-auto mt-20 py-20 flex flex-col md:flex-row transition-opacity duration-1000 ${inView ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}
            >
                <article className="flex w-full md:w-3/5 mb-10 md:mb-0">
                    <div className="w-1/2 relative group">
                        <img src={collage[0]} alt="Collage Image 1" className="object-cover h-5/6 rounded-lg group-hover:scale-90 transition-transform duration-300" />
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <div className="relative group w-3/4 h-3/5 mt-7 mb-5">
                            <img src={collage[1]} alt="Collage Image 2" className="w-full h-full object-cover rounded-lg group-hover:scale-90 transition-transform duration-300" />
                        </div>
                        <div className="relative group w-3/4 h-2/5">
                            <img src={collage[2]} alt="Collage Image 3" className="w-full h-full object-cover rounded-lg group-hover:scale-90 transition-transform duration-300" />
                        </div>
                    </div>
                </article>
                <article className="w-full md:w-2/5 flex items-center">
                    <div className="w-full">
                        <h1 className="playfair font-semibold text-3xl md:text-5xl mb-7">
                            Ofrecemos <p>calidad en cada platillo</p>
                        </h1>
                        <span className="text-sm md:text-md block mb-10">
                            Anímate a participar de esta experiencia de sabor y <br /> buena comida.
                        </span>
                        <ul className="space-y-4">
                            {beneficts.map((b, i) => (
                                <li className="flex items-center" key={i}>
                                    <div className="p-2 bg-[#de1369] text-white rounded-full">
                                        <i>{b.icon}</i>
                                    </div>
                                    <span className="font-semibold ml-4 text-xs md:text-sm">{b.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </article>
            </section>
        </>
    );
}

export default HomeSection4;
