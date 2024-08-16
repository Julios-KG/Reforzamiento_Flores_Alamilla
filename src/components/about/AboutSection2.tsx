function AboutSection2() {
    return ( 
        <>
            <section className="relative flex items-center justify-center h-screen bg-secundary overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50 z-30"></div>
                <div className="relative z-30 p-5 sm:w-1/2 text-center">
                    <div className="backdrop-blur-md bg-white p-10 bg-opacity-10 rounded hover:scale-105 transition-transform duration-700">
                        <span className="text-white playfair text-4xl md:text-5xl text-center lg:w-2/3">Siente el sabor auténtico y original de nosotros.</span>
                    </div>
                </div>
                <video autoPlay loop muted className="absolute z-10 w-full h-full object-cover">
                    <source src="src\assets\videos\aboutsection2banner.mp4" type="video/mp4" />Tu navegador no soporta videos :c.
                </video>
            </section>

        </>
    );
}

export default AboutSection2;