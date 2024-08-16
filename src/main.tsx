import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePageView from './views/HomePageView.tsx'
import Error404View from './views/Error404View.tsx'
import HeaderComponent from './components/HeaderComponent.tsx'
import MenuView from './views/MenuView.tsx'
import AboutView from './views/AboutView.tsx'
import ContactView from './views/ContactView.tsx'
import MenuProductDetailsView from './views/MenuProductDetailsView.tsx'
import CompletePurchaseView from './views/CompletePurchaseView.tsx'
import ManagementCenterView from './views/ManagementCenterView.tsx'
import Calendar from './components/managementCenter/Calendar.tsx'
import MealsCRUD from './components/managementCenter/MealsCRUD.tsx'
import DefaultLayout from './components/managementCenter/Layout.tsx'
import QuotesView from './components/managementCenter/Quotes/QuotesView.tsx'
import SignInView from './views/SignInView.tsx'
import SignUpView from './views/SignUpView.tsx'
import ProfileView from './views/ProfileView.tsx'
import OrdersView from './components/managementCenter/Orders/OrderView.tsx'
import ContactManagmentView from './components/managementCenter/Contacts/ContactManagmentView.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ThankYouView from './views/ThankYouView.tsx'

const clientID = '939303313556-m0e34snr0cbhsona6hf3s3vr71knph6s.apps.googleusercontent.com'

const route = createBrowserRouter([
  {
    path: "/",
    element: <HeaderComponent />,
    errorElement: <Error404View />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomePageView />,
      },
      {
        path: "/Menu",
        element: <MenuView />,
      },
      {
        path: "/About",
        element: <AboutView />,
      },
      {
        path: "/Contact",
        element: <ContactView />,
      },
      {
        path: "/Menu/:id",
        element: <MenuProductDetailsView />,
      },
      {
        path: "/finalizar-compra",
        element: <CompletePurchaseView />,
      },
      {
        path: '/Profile',
        element: <ProfileView />
      },
      {
        path: '/thank-you',
        element: <ThankYouView />
      },
      {
        path: "*",
        element: <Error404View />,
      },
    ],
  },
  {
    path: "/Management",
    element: <DefaultLayout />,
    children: [
      {
        path: "/Management/Dashboard",
        element: <ManagementCenterView />,
      },
      {
        path: "/Management/Calendar",
        element: <Calendar />,
      },
      {
        path: '/Management/AdminMeals',
        element: <MealsCRUD />
      },
      {
        path: '/Management/Quotes',
        element: <QuotesView />
      },
      {
        path: "/Management/Orders",
        element: <OrdersView />,
      },
      {
        path: "/Management/Contactos",
        element: <ContactManagmentView />,
      }

    ]
  },
  {
    path: '/SignIn',
    element: <SignInView />
  },
  {
    path: '/SignUp',
    element: <SignUpView />
  }, 
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientID}>
      <RouterProvider router={route} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
