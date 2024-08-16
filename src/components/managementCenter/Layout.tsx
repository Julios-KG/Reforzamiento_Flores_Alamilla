import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const userStored = localStorage.getItem('userInfo')
    const tokenStored = localStorage.getItem('authToken')

    if (!userStored && !tokenStored) {
      navigate('*')
    } else if (userStored) {
      const parsedUserInfo: IUser = JSON.parse(userStored);

      if (!parsedUserInfo.idRole || parsedUserInfo.idRole === 4) {
        navigate('*')
      }
    }

  }, [navigate])

  return (
    <div >
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className='bg-whiten '>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 min-h-full ">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
