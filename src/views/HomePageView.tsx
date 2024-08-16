import { useLocation } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import HomeSection3 from "../components/home/HomeSection3";
import HomeSection4 from "../components/home/HomeSection4";
import HomeServicesSection from "../components/home/HomeServicesSection";
import SectionBanquetes from "../components/home/SectionBanquetes";
import { useEffect, useState } from "react";


const HomePageView = () => {

    const location = useLocation()
    const [message, setMessage] = useState<string | null>(location.state?.message || null);

    useEffect(() => {
        if (message) {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000); // 3 segundos

        // Limpiar el temporizador si el componente se desmonta
        return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <>
            {message && <div className="message border-2 border-green-300 bg-green-100 text-green-500 text-center p-4 transition-all animate-jump duration-300">{message}</div>}
            <HeroSection />
            <HomeServicesSection />
            <SectionBanquetes />
            <HomeSection3 />
            <HomeSection4 />
        </>
    );
}

export default HomePageView;