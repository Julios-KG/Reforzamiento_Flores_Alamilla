import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconMail,
  IconNote,
  IconPhone,
} from "@tabler/icons-react";
import XIcon from "./icons/XIcon";
import TermsModal from "./terms/TermsModal";
import { useState } from "react";


const icons = [
  { link: 'https://www.facebook.com/profile.php?id=100064004102050', icon: <XIcon key="xicon" /> },
  { link: 'https://www.facebook.com/profile.php?id=100064004102050', icon: <IconBrandFacebook size={17} /> },
  { link: 'https://www.instagram.com/griseldacervera/', icon: <IconBrandInstagram size={18} /> },
  { link: 'https://www.tiktok.com/@griscervera?lang=es', icon: <IconBrandTiktok size={18} /> },
];

function IconsList() {
  return (
    <div className="w-full flex justify-center space-x-4 mt-6">
      {icons.map((icon, i) => (
        <a
          href={icon.link}
          key={i}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 transition duration-300 ease-in-out hover:bg-iconFoo hover:text-gray-100 rounded-full p-1"
        >
          <i>{icon.icon}</i>
        </a>
      ))}
    </div>
  );
}

function FooterComponent() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <footer className="bg-gray-900 p-10 text-neutral-content">
      <div className="mx-auto w-full max-w-screen-xl p-4 lg:py-6">
        <div className="md:flex md:justify-between">
          <nav className="mb-10">
            <div className="mb-6 md:mb-0">
              <a className="flex items-center justify-center md:justify-start">
                <img
                  src="../../public/img/logo.png"
                  className="w-[61px] mb-6"
                />
                <span className="self-center text-2xl playfair italic font-semibold whitespace-nowrap text-white mb-6">
                  Delicias
                </span>
              </a>
              <div className='flex flex-col items-center md:items-start'>
                <ul className="text-gray-500 font-medium text-center md:text-left">
                  <li className="mb-4">
                    <a>
                      En la nueva era de la tecnología <br/> miramos hacia el
                      futuro con <br/> certeza y orgullo por nuestra empresa.
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <IconsList />
          </nav>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <nav className='rounded-xl px-4 md:px-16'>
              <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-white text-center md:text-left">
                información
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium text-center md:text-left">
                <li className="mb-4">
                  <a href="/" className="hover:underline">
                    Inicio
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/Menu" className="hover:underline">
                    Menú
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/About" className="hover:underline">
                    Nosotros
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/Contact" className="hover:underline">
                    Contactanós
                  </a>
                </li>
              </ul>
            </nav>
            <nav>
              <div className='rounded-xl px-4 md:px-16'>
                <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-white text-center md:text-left">
                  Categorías
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium text-center md:text-left">
                  <li className="mb-4">
                    <a href="/Menu" className="hover:underline">
                      Entrada
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="/Menu" className="hover:underline">
                      Aperitivos
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="/Menu" className="hover:underline">
                      Bebidas
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="/Menu" className="hover:underline">
                      Postres
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </section>
          <section className="grid grid-cols-1 mt-10 md:mt-0">
            <nav className='rounded-xl px-4 md:px-16'>
              <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase text-center dark:text-white md:text-left">
                Conoce más
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium grid justify-center md:text-left">
                  <li className="mb-4">
                    <a href="mailto:contacto@delicias.com" className="hover:underline flex gap-2">
                      <IconMail /> contacto@delicias.com
                    </a>
                  </li>
                  <li className="mb-4">
                    <a className="hover:underline flex gap-2" href="tel:+529981230990">
                      <IconPhone /> (+52) 998-123-0990
                    </a>
                  </li>
                  <li className="mb-4">
                    <a onClick={handleOpenModal} className="hover:underline flex gap-2">
                      <IconNote /> Leer términos y condiciones
                    </a>
                  </li>
                </ul>
              </nav>
          </section>
        </div>
      </div>
      <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © Copyright © 2024 Delicias. Todos los derechos reservados.
      </span>
      <TermsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </footer>
  );
}

export default FooterComponent;
