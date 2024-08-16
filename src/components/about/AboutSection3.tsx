import { IconClock2, IconMeat, IconTruckDelivery } from "@tabler/icons-react";
import { useInView } from "react-intersection-observer";

const aboutInfo = [
    {icon: <IconMeat stroke={1} size={50} />, title: 'Varios platillos', desc: 'Encuentra tus platillos favoritos.', time: '200'},
    {icon: <IconTruckDelivery stroke={1} size={50} />, title: 'Fácil de ordenar', desc: 'Genera tu orden con unos cuantos clicks.', time: '300'},
    {icon: <IconClock2 stroke={1} size={50} />, title: 'Servicio rápido', desc: 'Conoce si tu orden está disponible en minutos.', time: '400'},
] 

const AboutSection3 = () => {

    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    return (  
        <>
            <section className="bg-secundary py-10 justify-center grid grid-cols-1 lg:grid-cols-3 gap-4">
                {aboutInfo.map((ai, i) => (
                    <article 
                        ref={ref}
                        className={`${inView ? `animate-fade-up animate-duration-${ai.time}` : 'opacity-0 translate-y-10'} flex flex-col items-center lg:flex-row lg:justify-center mb-5`} key={i}>
                        <div className="mb-5 lg:mb-0 text-red-600 lg:mr-3">
                            {ai.icon}
                        </div>
                        <div className="">
                            <h1 className="text-center lg:text-start font-bold text-lg mb-3">{ai.title}</h1>
                            <p className="text-center lg:text-start text-sm lg:max-w-44">{ai.desc}</p>
                        </div>
                    </article>
                ))
                }
            </section>
        </>
    );
}

export default AboutSection3;