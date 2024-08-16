import { Link } from "react-router-dom";
import HeroImg from "../../assets/img/hero.png";

const HeroSection = () => {
  return (
    <>
      <section
        className="flex items-center bg-bottom justify-center min-h-screen bg-cover animate-fade-down animate-ease-in relative"
        style={{ backgroundImage: `url(${HeroImg})` }}
      >
        <div className="relative text-center max-w-2xl mx-auto  px-4 sm:px-6 lg:px-8">
          <h1 className="backdrop-blur-sm bg-white rounded-r-lg  bg-opacity-10 p-3 md:backdrop-blur-0 md:bg-opacity-0 text-4xl playfair sm:text-4xl md:text-5xl lg:text-7xl mb-6">
            Banquetes <br />
            Exquisitos
          </h1>
          <p className="text-sm md:text-lg mb-8">
            ¡Transformamos tus eventos en experiencias inolvidables! <br />
            Celebra con nosotros y obtén un 15% de descuento en tu <br /> primer
            pedido.
          </p>
          <div className="flex flex-col justify-center md:space-x-4 md:flex-row">
            <Link to={'/Menu'} className="btn-red">
              Explorar menú
            </Link>
            <Link to={'/Contact'} className="btn-black">
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
