import { IContact } from "../../../interfaces/IContact";

const ContactCard = ({ contact }: { contact: IContact }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <h3 className="text-xl font-bold mb-2 text-primary">{contact.subject}</h3>
      <p className="text-gray-700 mb-2"><strong>Nombre:</strong> {contact.name}</p>
      <p className="text-gray-700 mb-2"><strong>Correo:</strong> {contact.email}</p>
      <p className="text-gray-700 mb-4"><strong>Mensaje:</strong> {contact.message}</p>
    </div>
  );
};

export default ContactCard;
