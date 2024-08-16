import { Link } from "react-router-dom";
import BanquetesImg from "../../assets/img/banquetes.png";
import { useInView } from "react-intersection-observer";

const SectionBanquetes = () => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <>
        <section ref={ref} className={`py-24 ${inView ? 'animate-fade-down' : 'opacity-0 translate-y-10'} bg-secundary py-16`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <img
                        src={BanquetesImg}
                        alt="Banquetes"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div className="lg:w-1/2 lg:pl-12">
                    <h2 className="text-5xl font-semibold mb-4 playfair">
                        Ofrecemos banquetes de alta calidad
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Durante muchos años, hemos ofrecido servicios de calidad con una excelente variedad de platos deliciosos y un sazón incomparable.
                    </p>
                    <p className="text-gray-600 mb-8">
                        Delicias es la mejor opción para tus eventos especiales, como bodas, quinceañeras y más.
                    </p>
                    <Link
                        to={'/About'}
                        className="btn-black"
                    >
                        Saber más
                    </Link>
                </div>
            </div>
        </section>
        </>
    );
}

export default SectionBanquetes;