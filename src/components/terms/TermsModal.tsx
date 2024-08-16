import React from "react";
import { IconSquareRoundedXFilled } from "@tabler/icons-react";
import useGetTerms from "../../hooks/terms/useGetTerms";

interface TermsModalProps {
    isOpen: boolean,
    onClose: () => void,
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {

    const { terms, loading, error } = useGetTerms('/Terms')

    if (!isOpen) return null
    if (loading) return <div> Cargando... </div>
    if (error) console.log(error.message)

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return ( 
        <>
            <div onClick={handleBackdropClick} className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white max-w-xl p-8 rounded-lg shadow-lg relative">
                    <button className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
                        <IconSquareRoundedXFilled className='text-primary' size={30}/>
                    </button>
                    <div className="mt-7 max-h-96">
                        <h1 className="font-bold text-lg md:text-2xl mb-3">Términos y Condiciones para Delicias Web App (Delicias Cancún)</h1>
                        <ul className="overflow-y-auto max-h-72 md:max-h-80">
                            {terms && terms.map((term) => (
                                <li className="flex flex-col" key={term.idTerms}>
                                    <h1 className="mt-5 text-primary font-semibold text-md md:text-xl">{term.title}</h1>
                                    {term.termsItem.map((item) => (
                                        <span key={item.idTermsItem} className="my-3 text-sm md:text-md">* {item.term}</span>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermsModal;