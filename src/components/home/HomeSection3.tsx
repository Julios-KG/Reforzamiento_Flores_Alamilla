import { useInView } from "react-intersection-observer";
import CateringImg from "../../assets/img/catering.png";
import CumpleañosImg from "../../assets/img/cumpleaños.webp";
import BodasImg from "../../assets/img/bodas.webp";
import EventosImg from "../../assets/img/eventos.webp";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";

const services = [
    { img: CateringImg, title: 'Catering', desc: `Servicio de catering profesional para cualquier ocasión.` },
    { img: CumpleañosImg, title: 'Cumpleaños', desc: 'Celebra tu día con estilo y sabor.' },
    { img: BodasImg, title: 'Bodas', desc: 'Haz de tu día especial un evento inolvidable.' },
    { img: EventosImg, title: 'Eventos', desc: 'Haz que cualquier evento sea extraordinario.' },
]

const HomeSection3 = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <section
            ref={ref}
            className={`container mx-auto my-20 px-4 max-w-7xl ${inView ? 'animate-fade-left animate-once' : 'opacity-0 translate-y-10'}`}
        >
            <h1 className="playfair font-semibold text-3xl md:text-5xl text-left">
                Ofrecemos servicios <p>únicos para sus eventos</p>
            </h1>
            <article className="mt-10">
                {isSmallScreen ? (
                    <Slider {...settings}>
                        {services.map((service, i) => (
                            <div key={i} className="px-2">
                                <div className="flex flex-col items-center">
                                    <div className="relative w-full h-64 overflow-hidden rounded-lg group">
                                        <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <Link to={'/Contact'} className="absolute inset-0 flex items-center justify-center bg-red-400 bg-opacity-50 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            Conocer más
                                        </Link>
                                    </div>
                                    <h2 className="text-xl font-bold mt-4 text-center">{service.title}</h2>
                                    <p className="text-base mt-3 max-w-xs text-center text-gray-600">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <ul className="grid xl:grid-cols-4 md:grid-cols-2 gap-8">
                        {services.map((service, i) => (
                            <li className="flex flex-col items-center" key={i}>
                                <div className="relative w-full h-64 overflow-hidden rounded-lg group">
                                    <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <Link to={'/Contact'} className="absolute inset-0 flex items-center justify-center bg-red-400 bg-opacity-50 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        Conocer más
                                    </Link>
                                </div>
                                <h2 className="text-xl font-bold mt-4 text-center">{service.title}</h2>
                                <p className="text-base mt-3 max-w-xs text-center text-gray-600">{service.desc}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </article>
        </section>
    );

}

export default HomeSection3;
