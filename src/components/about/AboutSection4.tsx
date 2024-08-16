import { useInView } from "react-intersection-observer";
import CountUp from 'react-countup';

const cards = [
    { title: 3, desc: 'Años de experiencia', prefix: '+', suffix: '' },
    { title: 1995, desc: 'Clientes', prefix: '', suffix: '' },
    { title: 65, desc: 'Miembros de Staff', prefix: '', suffix: '+' },
    { title: 100, desc: 'Satisfacción de los clientes', prefix: '', suffix: '%' },
]

const img = 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/pulled-chicken-beans-b903c2e.jpg'

const AboutSection4 = () => {
    
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    const { ref: ref2, inView: inView2 } = useInView({
        triggerOnce: true,
        threshold: 0.2
    })

    return (
        <>
            <section 
                ref={ref}
                className={`${inView ? 'animate-fade-up' : 'opacity-0 translate-y-10'} grid grid-cols-1 md:grid-cols-2 justify-center  pt-10 pb-10`}>
                <article className="pt-10 px-10 md:container">
                    <div className="">
                        <h1 className="mb-5 playfair text-3xl md:text-5xl text-center md:text-start lg:w-2/3">Información para nuestro valioso invitado.</h1>
                        <span className="text-xs flex text-center md:text-start md:text-sm">En este lugar, creemos que cenar no se trata solo de comida, sino también de la experiencia en general. Nuestro personal, reconocido por su calidez y dedicación, se esfuerza para hacer de cada visita un evento inolvidable.</span>
                    </div>
                    <div ref={ref2} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                        {cards.map((card, i) => (
                            <div 
                            className={`bg-secundary min-h-32 flex justify-center items-center  border-2 border-gray-200 text-center rounded-md transition-colors duration-500 hover:bg-red-100 hover:border-red-300`} key={i}>
                                <div>
                                    <h1 className="playfair pb-3 text-3xl lg:text-5xl">
                                        {inView2 && (
                                            <CountUp
                                                start={0}
                                                end={card.title}
                                                duration={4}
                                                prefix={card.prefix}
                                                suffix={card.suffix}
                                            />
                                        )}
                                    </h1>
                                    <p className="text-xs lg:text-sm">{card.desc}</p>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </article>
                <article className="p-10 flex items-center">
                    <img className="w-full h-full lg:h-4/5 object-cover rounded-lg transition-transform duration-500 hover:scale-105" src={img} alt="cooking" />
                </article>
            </section>
        </>
    );
}

export default AboutSection4;