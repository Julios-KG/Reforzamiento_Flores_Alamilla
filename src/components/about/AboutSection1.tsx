import { useInView } from "react-intersection-observer";

function AboutSection1() {
    
    const img = '../../../src/assets/img/About1.jpg'
    
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    return (
        <>
            <section 
                ref={ref}
                className={`${inView ? 'animate-fade-down' : 'opacity-0 translate-y-10'} grid grid-cols-1 md:grid-cols-2 justify-center bg-secundary pb-10`}>
                
                <article className="p-10 flex items-center">
                    <img className="w-full h-full lg:h-4/5 object-cover rounded-lg transition-transform duration-500 hover:scale-105" src={img} alt="meal" />
                </article>
                <article className="pt-10 px-10 md:container my-auto">
                    <div className="">
                        <h1 className="mb-5 playfair text-3xl md:text-5xl text-center md:text-start lg:w-2/3">Brindamos alimentos saludables para tus eventos.</h1>
                        <span className="text-xs flex text-center md:text-start md:text-sm">Nuestra historia comenzó con la visión de crear una experiencia gastronómica única que combine buena comida, un servicio excepcional y un ambiente vibrante. Arraigados en la rica cultura culinaria de la ciudad, nuestro objetivo es honrar nuestras raíces locales mientras infundimos un paladar global.</span>
                        <span className="text-xs flex text-center md:text-start md:text-sm my-4 text-gray-600">En este lugar, creemos que cenar no se trata solo de comida, sino también de la experiencia en general. Nuestro personal, reconocido por su calidez y dedicación, se esfuerza para hacer de cada visita un evento inolvidable.</span>
                    </div>
                </article>

            </section>
        </>
    );
}

export default AboutSection1;