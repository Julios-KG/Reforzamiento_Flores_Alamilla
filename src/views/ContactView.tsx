import React, { useEffect, useState } from "react";
import { IContact } from "../interfaces/IContact";
import usePostContact from "../hooks/contact/usePostContact";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import MapComponent from "../components/MapComponent";

const ContactView = () => {
  const [animPlayed, setAnimPlayed] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const animationPlayed = localStorage.getItem("animationPlayed");
    if (animationPlayed) setAnimPlayed(true);
  }, []);

  useEffect(() => {
    if (inView && !animPlayed) {
      localStorage.setItem("animationPlayed", "true");
      setAnimPlayed(true);
    }
  }, [animPlayed, inView]);

  const [formData, setFormData] = useState<Omit<IContact, "idContact">>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Omit<IContact, "idContact">>>(
    {}
  );
  const { createdContact, loading, postNewContact } =
    usePostContact("/Contact");
  const navigate = useNavigate();

  const validate = (): Partial<Omit<IContact, "idContact">> => {
    const newErrors: Partial<Omit<IContact, "idContact">> = {};

    if (!formData.name) {
      newErrors.name = "Nombre es requerido";
    } else if (formData.name.length < 2) {
      newErrors.name = "Nombre muy corto";
    } else if (formData.name.length > 50) {
      newErrors.name = "Nombre muy largo";
    }

    if (!formData.email) {
      newErrors.email = "Correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo inválido";
    }

    if (!formData.subject) {
      newErrors.subject = "Asunto es requerido";
    } else if (formData.subject.length < 2) {
      newErrors.subject = "Asunto muy corto";
    } else if (formData.subject.length > 100) {
      newErrors.subject = "Asunto muy largo";
    }

    if (!formData.message) {
      newErrors.message = "Mensaje es requerido";
    } else if (formData.message.length < 10) {
      newErrors.message = "Mensaje muy corto";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await postNewContact(formData);
      console.log("Contact sent:", createdContact);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
      navigate("/", {
        state: {
          message: "¡Gracias por contactarnos!, espera una respuesta pronto.",
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name as keyof Omit<IContact, "idContact">]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  return (
    <section
      ref={ref}
      className={`flex flex-col items-center justify-center pt-10 pb-10 bg-secundary space-y-1 ${
        inView && !animPlayed ? "animate-fade-down" : ""
      } `}
    >
      <h1 className="text-5xl md:text-8xl playfair mb-6"> Contáctanos </h1>
      <h4 className="text-center text-sm lg:text-lg">
        Estamos aquí para atender todas tus necesidades y responder <br /> a tus
        consultas.
      </h4>
      <article className="w-full sm:w-3/4 flex items-center justify-center p-6 sm:p-8 sm:my-6 xl:w-2/3">
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="shadow-2xl bg-white rounded-lg px-12 pt-10 pb-12 grid gap-6"
          >
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-simple text-sm md:text-lg">
                  Nombre
                </label>
                <input
                  className={`text-sm md:text-lg block w-full mt-1 p-3 border rounded-lg hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="Nombre(s)"
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>
              <div>
                <label className="font-semibold text-simple text-sm md:text-lg">
                  Correo Electrónico
                </label>
                <input
                  className={`text-sm md:text-lg block w-full mt-1 p-3 border rounded-lg hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  type="text"
                  placeholder="ejemplo@email.com"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
            </section>
            <section>
              <label className="font-semibold text-simple text-sm md:text-lg">
                Asunto
              </label>
              <input
                className={`text-sm md:text-lg block w-full mt-1 p-3 border rounded-lg hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.subject}
                onChange={handleChange}
                name="subject"
                type="text"
                placeholder="Escribe tu asunto"
              />
              {errors.subject && (
                <div className="text-red-500 text-sm">{errors.subject}</div>
              )}
            </section>
            <section>
              <label className="font-semibold text-simple text-sm md:text-lg">
                Mensaje
              </label>
              <textarea
                className={`text-sm md:text-lg block w-full min-h-32 mt-1 p-4 border rounded-lg hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.message}
                onChange={handleChange}
                name="message"
                placeholder="Escribe tu mensaje..."
              />
              {errors.message && (
                <div className="text-red-500 text-sm">{errors.message}</div>
              )}
            </section>
            <section className="flex items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="btn-red w-auto px-4 py-4 text-center text-2xl rounded-md"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </section>
          </form>
        </div>
      </article>
      <div className="w-full sm:w-3/4 xl:w-2/3 mt-10">
        <MapComponent />
      </div>
    </section>
  );
};

export default ContactView;
