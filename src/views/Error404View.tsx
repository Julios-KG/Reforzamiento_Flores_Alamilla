import { Link } from "react-router-dom";

function Error404View() {
  const ImgError = "../../../src/assets/img/error.png";

  return (
    <>
      <section className=" animate-fade-down opacity-0 translate-y-10 bg-secundary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pl-12">
            <h2 className="text-7xl font-semibold mb-4 playfair">
              Oops! <br />
              Error 404
            </h2>
            <p className="text-gray-600 mb-4 mt-5">
              Parece que te equipocaste de camino.
            </p>
            <Link to="/" className="btn-red">
              Volver al home
            </Link>
          </div>
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img src={ImgError} alt="Banquetes" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Error404View;
