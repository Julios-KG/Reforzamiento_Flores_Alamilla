import { useEffect, useState } from "react";
import usePostUser from "../hooks/user/usePostUser";
import { IUser } from "../interfaces/IUser";
import { Link, useNavigate } from "react-router-dom";
import PasswordToggle from "../components/icons/PasswordToggle";
import TermsModal from "../components/terms/TermsModal";

const SignUpView = () => {
  interface Terms {
    termsAccepted: string;
  }

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<Omit<IUser, "idUser">>({
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    urlPP: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-No-Background.png",
    idRole: 4,
    given_name: "",
    family_name: "",
    picture: "",
  });
  const [errors, setErrors] = useState<Partial<Omit<IUser & Terms, "idUser">>>(
    {}
  );

  const { createdUser, loading, error, postNewUser } = usePostUser("/User");

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) navigate("/");
  }, [navigate]);

  const validate = (): Partial<Omit<IUser & Terms, "idUser">> => {
    const newErrors: Partial<Omit<IUser & Terms, "idUser">> = {};

    if (!formData.name) {
      newErrors.name = "Nombre es requerido";
    } else if (formData.name.length < 2) {
      newErrors.name = "Nombre muy corto";
    } else if (formData.name.length > 50) {
      newErrors.name = "Nombre muy largo";
    }

    if (!formData.lastName) {
      newErrors.name = "Apellido es requerido";
    } else if (formData.name.length < 2) {
      newErrors.name = "Apellido muy corto";
    } else if (formData.name.length > 50) {
      newErrors.name = "Apellido muy largo";
    }

    if (!formData.email) {
      newErrors.email = "Correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo inválido";
    }

    if (/^\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "El número de teléfono debe tener 10 dígitos";
    }

    if (!formData.password) {
      newErrors.password = "Contraseña es requerida";
    } else if (formData.password.length < 12) {
      newErrors.password = "Contraseña al menos de 12 caracteres";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "Debes aceptar los términos y condiciones";
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await postNewUser(formData);

      if (response) {
        setErrors({});
        console.log("User sent:", createdUser);
        navigate("/SignIn", {
          state: {
            messsage: "¡Registro exitoso!, inicia sesión para continuar.",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    if (!error) {
      setFormData({
        name: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        urlPP: "",
        idRole: 0,
        given_name: "",
        family_name: "",
        picture: "",
      });
      console.log("Usuario creado exitosamente");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name as keyof Omit<IUser, "idUser">]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="flex flex-col md:flex-row items-center min-h-screen p-6">
        <section className="flex-1 h-full max-w-4xl mx-auto overflow-hidden">
          <article className="flex flex-col md:flex-row">
            <div
              onClick={() => navigate("/")}
              className="hover:cursor-pointer h-48 md:h-auto md:w-1/2 relative rounded-md overflow-hidden"
            >
              <div className="absolute inset-0 rounded-md bg-black opacity-30 z-30"></div>
              <div className="absolute inset-0 flex flex-col gap-1 items-center justify-center z-30">
                <span className="text-white font-bold text-lg md:text-3xl text-center">
                  Siente el sabor auténtico y original de nosotros
                </span>
                <span className="text-white text-xs text-center">
                  Click aquí y revisa nuestro menú.
                </span>
              </div>
              <img
                className="object-cover w-full h-full rounded-md"
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="SignInImage"
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:my-12 md:w-5/6">
              <div className="w-full">
                <Link to={"/"} className="flex justify-center">
                  <img
                    src="../../public/img/logo.png"
                    alt=""
                    className="w-1/4"
                  />
                </Link>
                <h1 className="mb-4 text-xl font-semibold text-center text-titule">
                  ¡Bienvenido a Delicias!
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="w-1/3 font-semibold text-simple text-right">
                      Nombre
                    </label>
                    <input
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      type="text"
                      placeholder="Nombre (s)"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && (
                    <div className="text-red-500 text-sm mb-2 text-right">
                      {errors.name}
                    </div>
                  )}
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="w-1/3 font-semibold text-simple text-right">
                      Apellido
                    </label>
                    <input
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      type="text"
                      placeholder="Apellido (s)"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.lastName && (
                    <div className="text-red-500 text-sm mb-2 text-right">
                      {errors.lastName}
                    </div>
                  )}
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="w-1/3 font-semibold text-simple text-right">
                      Número de teléfono
                    </label>
                    <input
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      type="text"
                      placeholder="(999) 999 9999"
                      name="phoneNumber"
                      value={formData?.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <div className="text-red-500 text-sm mb-2 text-right">
                      {errors.phoneNumber}
                    </div>
                  )}
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="w-1/3 font-semibold text-simple text-right">
                      Correo electrónico
                    </label>
                    <input
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      type="email"
                      placeholder="example@mail.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <div className="text-red-500 text-sm mb-2 text-right">
                      {errors.email}
                    </div>
                  )}
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="w-1/3 font-semibold text-simple text-right">
                      Contraseña
                    </label>
                    <div className="relative flex-1">
                      <input
                        className="p-2 border border-gray-300 rounded-md w-full"
                        type={showPassword ? "text" : "password"}
                        placeholder=""
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={toggleShowPassword}
                      >
                        <PasswordToggle showPassword={showPassword} />
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <div className="text-red-500 text-sm mb-2 text-right">
                      {errors.password}
                    </div>
                  )}
                  <div className="flex items-center space-x-4 mb-4">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      className="form-checkbox h-5 w-5 text-primary focus:outline-none"
                      checked={termsAccepted}
                      onChange={() => setTermsAccepted(!termsAccepted)}
                    />
                    <label
                      htmlFor="termsAccepted"
                      className="flex-1 font-semibold text-simple"
                    >
                      He leído y acepto los{" "}
                      <button
                        type="button"
                        className="underline ml-1 hover:cursor-pointer"
                        onClick={handleOpenModal}
                      >
                        términos y condiciones
                      </button>
                    </label>
                  </div>
                  {errors.termsAccepted && (
                    <div className="text-red-500 text-sm mb-2 text-right">
                      {errors.termsAccepted}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full px-4 py-2 mt-4 text-white bg-primary rounded-md focus:outline-none"
                    disabled={loading}
                  >
                    {loading ? "Creando cuenta..." : "Crear cuenta"}
                  </button>
                  <p className="mt-4 text-sm text-center">
                    ¿Ya tienes una cuenta?
                    <Link
                      to="/SignIn"
                      className="underline ml-1 hover:text-primary"
                    >
                      Inicia sesión
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </article>
        </section>
        <TermsModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </main>
    </>
  );
};

export default SignUpView;