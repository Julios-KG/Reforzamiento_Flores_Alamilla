import "./css/header-styles.css";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconMail,
  IconPhone,
  IconShoppingBag,
} from "@tabler/icons-react";
import XIcon from "./icons/XIcon";
import ScrollToTop from "./ScrollToTop";
import FooterComponent from "./FooterComponent";
import SideModal from './SideModal';
import { IUser } from "../interfaces/IUser";
import { IMeal } from "../interfaces/IMeal";
import DropdownProfile from "./profile/DropdownProfile";

const icons = [
  {
    link: "https://www.facebook.com/profile.php?id=100064004102050",
    icon: <XIcon key="xicon" />,
  },
  {
    link: "https://www.facebook.com/profile.php?id=100064004102050",
    icon: <IconBrandFacebook size={17} key="facebook" />,
  },
  {
    link: "https://www.instagram.com/griseldacervera/",
    icon: <IconBrandInstagram size={18} key="instagram" />,
  },
  {
    link: "https://www.tiktok.com/@griscervera?lang=es",
    icon: <IconBrandTiktok size={18} key="tiktok" />,
  },
];

const contactInfo = [
  {
    icon: <IconPhone size={16} key="phone" />,
    contactType: "(+52) 998-123-0990",
  },
  {
    icon: <IconMail size={16} key="mail" />,
    contactType: "contacto@delicias.com",
  },
];

const navBarItems = [
  {
    name: "Inicio",
    link: "/",
  },
  {
    name: "Menú",
    link: "/Menu",
  },
  {
    name: "Nosotros",
    link: "/About",
  },
  {
    name: "Contáctanos",
    link: "/Contact",
  },
];

const HeaderComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sideModalOpen, setSideModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [selectedMenu, setSelectedMenu] = useState('/');
  const [cart, setCart] = useState<IMeal[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const location = useLocation();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedUserInfo: IUser = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getTopPageStyle = () => {
    if (
      location.pathname !== "/" && 
      location.pathname !== "/Menu" && 
      location.pathname !== "/finalizar-compra"
    ) {
      return "bg-secundary";
    } else {
      return "bg-white";
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSideModal = () => {
    setSideModalOpen(!sideModalOpen);
  };

  const handleSelectMenu = (link: string) => {
    setSelectedMenu(link);
  };
  
  const handleRemoveItem = (idMeal: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.idMeal !== idMeal);
      
      if (updatedCart.length === 0) {
        setSideModalOpen(false);
        window.location.reload();
        return [];
      }
      
      return updatedCart;
    });
  };
  
  
  
  
  
  
  

  return (
    <>
      <ScrollToTop />
      <header className="box-content w-full sticky-header">
        <nav className="top-page text-white p-2 text-sm flex justify-center md:justify-between items-center sm:px-1 md:px-28">
          <div className="flex items-center gap-6">
            {contactInfo.map((ci, i) => (
              <div key={i} className="flex items-center xs:justify-between">
                {ci.icon}
                <span className="ml-1 text-xs">{ci.contactType}</span>
              </div>
            ))}
          </div>
          <div className="hidden md:flex justify-end gap-2">
            {icons.map((icon, i) => (
              <Link
                to={icon.link}
                key={i}
                className="text-gray-400 transition duration-300 ease-in-out hover:bg-iconFoo hover:text-gray-100 rounded-full p-1 top-button"
              >
                <i>{icon.icon}</i>
              </Link>
            ))}
          </div>
        </nav>
        <nav
          className={`${getTopPageStyle()} py-3 flex px-5 justify-between md:justify-around items-center md:px-28`}
        >
          <section className="flex items-center">
            <img src="../../public/img/logo.png" width={70} className="mr-3" alt="Delicias Logo" />
            <Link
              to={"/"}
              onClick={() => handleSelectMenu('/')}
              className="playfair hidden lg:flex font-semibold italic text-2xl lg:text-4xl"
            >
              Delicias
            </Link>
            <button 
              onClick={toggleSideModal}
              className="md:hidden ml-2"  
            >
              <IconShoppingBag
                className="mr-4 hover:bg-[#DBDFD0] hover:rounded-lg"
                size={25}
                strokeWidth={1.5}
              />
            </button>
          </section>
          <div className="hidden md:flex flex-1 justify-center">
            {navBarItems.map((item, i) => (
              <ul key={i}>
                <li className="px-3 text-sm font-semibold">
                  <Link onClick={() => handleSelectMenu(item.link)} className={`btn-navbar ${selectedMenu === item.link ? 'btn-navbar-active' : ''}`} to={item.link}>
                    {item.name}
                  </Link>
                </li>
              </ul>
            ))}
          </div>
          <div className="hidden md:flex items-center">
            <button onClick={toggleSideModal}>
              <IconShoppingBag
                className="mr-4 hover:bg-[#DBDFD0] hover:rounded-lg"
                size={25}
                strokeWidth={1.5}
              />
            </button>
            <DropdownProfile toggleMenu={toggleMenu} />
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className={`${getTopPageStyle()} md:hidden pb-7`}>
            <div className="flex flex-col items-center pt-2 space-y-2">
              {navBarItems.map((item, i) => (
                <ul key={i} className="w-full text-center">
                  <li className="py-2 text-sm font-semibold">
                    <Link onClick={toggleMenu} className={`btn-navbar`} to={item.link}>
                      {item.name}
                    </Link>
                  </li>
                </ul>
              ))}
              <DropdownProfile toggleMenu={toggleMenu} />
            </div>
          </div>
        )}
      </header>
      <SideModal isOpen={sideModalOpen} onClose={toggleSideModal} cart={cart} onRemoveItem={handleRemoveItem} />
      <Outlet />
      <FooterComponent />
    </>
  );
};

export default HeaderComponent;