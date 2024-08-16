import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import React from 'react';

interface ProfilePictureModalProps {
    isOpen: boolean,
    onClose: () => void,
    imageUrl: string,
}

const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({ isOpen, onClose, imageUrl }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div onClick={handleBackdropClick} className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-7 rounded-lg shadow-lg relative">
                <button className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
                    <IconSquareRoundedXFilled className='text-primary' size={30}/>
                </button>
                {imageUrl ?
                    <img src={imageUrl} alt="Profile" className="max-w-56 max-h-56 md:max-w-lg md:max-h-lg rounded-lg" />
                    :
                    <p className='m-5'>Sin foto de perfil...</p>
                }
            </div>
        </div>
    );
};

export default ProfilePictureModal;
