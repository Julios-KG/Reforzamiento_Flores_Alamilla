import React, { useState, useEffect } from 'react';
import ContactCard from './ContactCard';
import { IContact } from '../../../interfaces/IContact';
import useGetContact from '../../../hooks/contact/useGetContact';
import { MagicMotion } from 'react-magic-motion';
import ContactCardSkeleton from './ContactCardSkeleton';

const ContactManagmentView = () => {
    const { contact, loading, error } = useGetContact('/Contact');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(contact);

    useEffect(() => {

        let result = contact

        if (searchTerm) {
            result = result.filter((contact: IContact) => {
                return contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.email.toLowerCase().includes(searchTerm.toLowerCase());
            });
        }

        setFilteredContacts(result);
      }, [searchTerm, contact]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      { loading ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContactCardSkeleton/><ContactCardSkeleton/>
        </div> 
            :
        <MagicMotion>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContacts.map(contact => (
                    <ContactCard key={contact.idContact} contact={contact} />
                ))}
            </div>
        </MagicMotion>
        }


    </div>
  );
};

export default ContactManagmentView;
