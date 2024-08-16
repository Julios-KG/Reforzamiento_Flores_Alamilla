import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/user/useLogin";
import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { jwtDecode } from "jwt-decode";
import PasswordToggle from "../components/icons/PasswordToggle";
import TermsModal from "../components/terms/TermsModal";


const SignInView = () => {
  const clientID = '939303313556-m0e34snr0cbhsona6hf3s3vr71knph6s.apps.googleusercontent.com'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
  const navigate = useNavigate()

  const { userLoged, loading, error, loginUser } = useLogin("/Login")
  
  const newErrors: { email?: string, password?: string } = {};
  
  if (error) console.error(error)

  useEffect(() => {

    const storedUserInfo = localStorage.getItem('userInfo')

    if (storedUserInfo) navigate('/')

    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      })
    }

    gapi.load("client: auth2", start)
  }, [navigate])

  const validate = () => {

    if (!email) {
      newErrors.email = 'Por favor introduzca un correo'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Correo inválido"
    }

    if (!password) {
      newErrors.password = 'Por favor introduzca una contraseña';
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await loginUser(email, password);
      
      if (response) {
        setErrors({});
        console.log("User loged:", userLoged);
        
        if (response?.idRole === 1 || response?.idRole === 2 || response?.idRole === 3) {
          navigate('/Management/Dashboard')
        } else {
          navigate('/');
        }
      } else {
        setErrors({ email: 'Correo o contraseña incorrectos' });
      }
    } catch (error) {
      console.log(error)
      setErrors({password: 'Correo o contraseña incorrectos'})
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (response: any) => {
    const decodedInfo = jwtDecode(response?.credential)
    localStorage.setItem('authToken', response?.credential)
    localStorage.setItem('userInfo', JSON.stringify(decodedInfo))
    navigate('/')
  }

  const onError = () => {
    console.log('Error to Login')
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <main className="flex items-center min-h-screen p-6">
        <section className="flex-1 h-full max-w-4xl mx-auto">
          <article className="flex flex-col overflow-y-auto md:flex-row">
            <div onClick={() => navigate('/')} className="hover:cursor-pointer h-32 md:h-auto md:w-1/2 relative rounded-md overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-30 z-30"></div>
              <div className="absolute inset-0 flex flex-col gap-1 items-center justify-center z-30">
                <span className="text-white font-bold md:max-w-54 text-lg md:text-3xl playfair text-center">Siente el sabor auténtico y original de nosotros</span>
                <span className="text-white md:max-w-54 text-xs text-center">Click aquí y revisa nuestro menú.</span>
              </div>
              <img
                className="object-cover w-full h-full rounded-md"
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="SignInImage"
              />
            </div>
            <article className="flex items-center justify-center p-6 sm:p-12 sm:my-12 md:w-1/2">
              <div className="w-full">
                <Link to={'/'} className="flex justify-center">
                  <img src="../../public/img/logo.png" alt="" className="w-1/4"/>
                </Link>
                <h1 className="mb-4 text-xl font-semibold text-center text-titule">
                  Bienvenido
                  <br /><small className="text-primary">
                    ¡Inicia sesión y empieza a reservar!
                  </small>
                </h1>
                <form onSubmit={handleSubmit}>
                  <label className="font-semibold text-simple">
                    Correo electrónico
                  </label>
                  <input
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md mb-2"
                    type="text"
                    placeholder="ejemplo@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && 
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  }
                  <label className="font-semibold text-simple">
                    Contraseña
                  </label>
                  <div className="relative flex items-center">
                    <input
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                      type={`${showPassword ? 'text' : 'password'}`}
                      placeholder="********"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <PasswordToggle showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
                    </div>
                  </div>
                  {errors.password && 
                    <div className="text-red-500 text-sm">{errors.password}</div>
                  }
                  <button 
                    type="submit" 
                    className="block w-full px-4 py-2 mt-4 text-base font-medium leading-5 text-center btn-red"
                    disabled={loading}
                  >
                    {!loading ? 'Iniciar Sesión' : 'Iniciando...'}
                  </button>
                  <div className="relative flex items-center my-5">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="flex-shrink mx-2 text-gray-300">ó</span>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>
                  <div className="flex justify-center">
                      <GoogleLogin
                        onSuccess={onSuccess}
                        onError={onError}
                        size="large"
                      />
                  </div>
                </form>
                <p className="mt-8 text-simple">
                  ¿No tienes una cuenta?
                  <Link
                    to={'/SignUp'}
                    className="font-semibold text-primary ml-1 hover:text-[#f23d88]"
                  >
                    Regístrate
                  </Link>
                </p>
                <a onClick={handleOpenModal} className="text-simple hover:cursor-pointer underline">Terminos y condiciones</a>
              </div>
            </article>
          </article>
        </section>
      </main>
      <TermsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default SignInView;
