import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { Link, useNavigate } from "react-router-dom";
import PasswordToggle from "../components/icons/PasswordToggle";
import ProfilePictureModal from "../components/profile/ProfilePictureModal";
import { googleLogout } from "@react-oauth/google";
import { IconDeviceDesktopAnalytics } from "@tabler/icons-react";
import GoogleIcon from "../components/icons/GoogleIcon";
import usePutUser from "../hooks/user/usePutUser";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProfileView = () => {

  const [userInfo, setUserInfo] = useState<IUser>()
  const [showPassword, setShowPassword] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [message, setMesagge] = useState('')
  const navigate = useNavigate()
  
  const { loading, putUser } = usePutUser('/User')
  
  const [formData, setFormData] = useState<Omit<IUser, "family_name" | "given_name" | "picture">>({
    idUser: 0,
    name: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    urlPP: '',
    idRole: 4
  })

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      const parsedUserInfo: IUser = JSON.parse(storedUserInfo)
      setUserInfo(parsedUserInfo)
      setFormData({
        idUser: parsedUserInfo.idUser,
        name: parsedUserInfo.name,
        lastName: parsedUserInfo.lastName,
        phoneNumber: parsedUserInfo.phoneNumber,
        email: parsedUserInfo.email,
        password: parsedUserInfo.password,
        urlPP: parsedUserInfo.urlPP,
        idRole: parsedUserInfo.idRole
      })
    } else {
      navigate('/SignIn')
    }
  }, [navigate])

  const [errors, setErrors] = useState<Partial<Omit<IUser, "family_name" | "given_name" | "picture">>>({})

  const validate = (): Partial<Omit<IUser, "family_name" | "given_name" | "picture">> => {
    const newErrors: Partial<Omit<IUser, "family_name" | "given_name" | "picture">> = {}

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
      newErrors.phoneNumber = "El número de teléfono debe tener 10 dígitos"
    } 

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    
    if (userInfo?.family_name) {
      setMesagge('Estas intentando algo que no deberías😊')
      return
    }
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      if (userInfo) {
        const response = await putUser({
          ...formData, idUser: userInfo.idUser,
          family_name: "",
          given_name: "",
          picture: ""
        })
  
        if (response) { 
          localStorage.setItem('userInfo', JSON.stringify(response));
          const storedUserInfo = localStorage.getItem('userInfo')
          if (storedUserInfo) {
            const parsedUserInfo: IUser = JSON.parse(storedUserInfo)
            setUserInfo(parsedUserInfo)
            setFormData({
              idUser: parsedUserInfo.idUser,
              name: parsedUserInfo.name,
              lastName: parsedUserInfo.lastName,
              phoneNumber: parsedUserInfo.phoneNumber,
              email: parsedUserInfo.email,
              password: parsedUserInfo.password,
              urlPP: parsedUserInfo.urlPP,
              idRole: parsedUserInfo.idRole
            })
          
            setErrors({});
            
            toast.success('¡Informacion actualizada!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (errors[e.target.name as keyof Omit<IUser, "family_name" | "given_name" | "picture">]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      })
    }
  }


  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleCloseSesion = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('authToken')
    googleLogout()
    navigate('/SignIn')
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const confirmDisabled = () => {
    if (userInfo?.given_name) return true
    return false
  }

  return (
    <>
      <div className="isolate bg-[#F9F9F7] px-6 py-10 sm:py-10 lg:px-8">
        <section className="mx-auto max-w-2xl text-center">
          <ToastContainer />
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
              <div className="w-24 h-24 relative">
                <img
                  className="rounded-full cursor-pointer ring-8 ring-white w-full h-full object-cover"
                  src={`${userInfo?.picture || userInfo?.urlPP ? userInfo.urlPP || userInfo.picture : 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}`}
                  alt="Profile Avatar"
                  onClick={handleOpenModal}
                />
              </div>
              <div className="mt-3 md:m-0 col-span-1 text-left my-auto items-center md:items-start flex flex-col">
                <p className="text-xl text-primary font-bold">{`${userInfo?.name} ${userInfo?.lastName ? userInfo.lastName : ''}`}</p>
                <p className="font-semibold text-simple">
                {userInfo?.idRole === 1 ?
                  'Super Administrador' :
                  userInfo?.idRole === 2 ?
                  'Administrador' : 
                  userInfo?.idRole === 3 ?
                  'Colaborador' :
                  'Cliente'
                }
                </p>
              </div>
            </div>

            <div className=" my-auto ">
              <button
                type="submit"
                className="btn-red rounded-lg "
              >
                Nueva foto
              </button>
            </div>
          </div>
          {userInfo?.idRole === 1 || userInfo?.idRole === 2 || userInfo?.idRole === 3 ?
            <div className="mt-5 flex flex-col">
              <Link to={'/Management/Dashboard'} className="btn-outlined hover:bg-indigo-500 hover:border-blue-400 border-gray-300 text-gray-500 flex justify-center gap-2 items-center"><IconDeviceDesktopAnalytics /> Ir al centro de manejo</Link>
            </div> : ''
          }
        </section>
        <form className="mx-auto mt-5 max-w-xl sm:mt-5" onSubmit={handleSubmit}>

          <hr className="my-8 rounded " />
          {userInfo?.family_name && 
            <div className="flex items-center gap-2 mb-8 rounded-lg bg-white border-2 border-gray-200">
              <GoogleIcon />
              <span className="text-gray-400">Has iniciado con Google</span>
            </div>
          }
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-primary">
                Nombre(s)
              </label>
              <div className="mt-2.5">
                <input
                  disabled={confirmDisabled()}
                  type="text"
                  name="name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData?.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-primary">
                Apellidos
              </label>
              <div className="mt-2.5">
                <input
                  disabled={confirmDisabled()}
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData?.lastName || userInfo?.family_name}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <div className="text-red-500 text-sm">{errors.lastName}</div>
                )}
              </div>
            </div>
            {userInfo?.password &&
              <div className="sm:col-span-2">
                <label htmlFor="username" className="block text-sm font-semibold leading-6 text-primary">
                  Contraseña
                </label>
                <div className="mt-2.5 flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="username"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <PasswordToggle showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
                </div>
                {errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>
            }
          </div>

          <hr className=" my-7 rounded " />

          <div className={`grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2`} >
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-primary">
                Correo
              </label>
              <div className="mt-2.5">
                <input
                  disabled={confirmDisabled()}
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData?.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-primary">
                Telefono
              </label>
              <div className="mt-2.5">
                <input
                  disabled={confirmDisabled()}
                  type="text"
                  name="phoneNumber"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData?.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 grid md:flex gap-2">
            <button
              disabled={!!userInfo?.family_name}
              type="submit"
              className={`block w-full md:w-2/3 px-3.5 py-2.5 ${userInfo?.family_name ? 'btn-red-disabled' : 'btn-red'}`}
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button
              onClick={handleCloseSesion}
              type="submit"
              className="block w-full md:w-1/3 px-3.5 py-2.5 btn-black "
            >
              Cerrar Sesión
            </button>
          </div>
          {message && (
            <div className="text-red-500 text-center text-sm">{message}</div>
          )}
        </form>
      </div>
      
      <ProfilePictureModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        imageUrl={`${userInfo?.urlPP || userInfo?.picture ? 
          userInfo.urlPP || userInfo.picture : 
          ''}`} 
      />
    </>
  );
}

export default ProfileView;