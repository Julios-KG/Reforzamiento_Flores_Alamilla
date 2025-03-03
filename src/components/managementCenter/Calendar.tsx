
const Calendar = () => {
  return (
    <>

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default    dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Domingo </span>
                <span className="block lg:hidden"> Dom </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Lunes </span>
                <span className="block lg:hidden"> Lun </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Martes </span>
                <span className="block lg:hidden"> Mar </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Miercoles </span>
                <span className="block lg:hidden"> Mie </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Jueves </span>
                <span className="block lg:hidden"> Jue </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Viernes </span>
                <span className="block lg:hidden"> Vie </span>
              </th>
              <th className="flex h-15 items-center justify-center rounded-tr-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Sabado </span>
                <span className="block lg:hidden"> Sab </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Line 1 --> */}
            <tr className="grid grid-cols-7">
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  1
                </span>
                <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
                  <span className="group-hover:text-primary md:hidden">
                    More
                  </span>
                  <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 md:visible md:w-[190%] md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black  ">
                      Reservacion 1
                    </span>
                    <span className="time text-sm font-medium text-black  ">
                      9:00 p.m.
                    </span>
                  </div>
                </div>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  2
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  3
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  4
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  5
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  6
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  7
                </span>
              </td>
            </tr>
            {/* <!-- Line 1 --> */}
            {/* <!-- Line 2 --> */}
            <tr className="grid grid-cols-7">
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  8
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  9
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  10
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  11
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  12
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  13
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  14
                </span>
              </td>
            </tr>
            {/* <!-- Line 2 --> */}
            {/* <!-- Line 3 --> */}
            <tr className="grid grid-cols-7">
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  15
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  16
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  17
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  18
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  19
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  20
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  21
                </span>
              </td>
            </tr>
            {/* <!-- Line 3 --> */}
            {/* <!-- Line 4 --> */}
            <tr className="grid grid-cols-7">
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  22
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  23
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  24
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray     md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  25
                </span>
                <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
                  <span className="group-hover:text-primary md:hidden">
                    More
                  </span>
                  <div className="event invisible absolute left-2 z-99 mb-1 flex w-[300%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 md:visible md:w-[290%] md:opacity-100">
                    <span className="event-name text-sm font-semibold text-black  ">
                      Reservacion 2
                    </span>
                    <span className="time text-sm font-medium text-black  ">
                      8:30 p.m.
                    </span>
                  </div>
                </div>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  26
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  27
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  28
                </span>
              </td>
            </tr>
            {/* <!-- Line 4 --> */}
            {/* <!-- Line 5 --> */}
            <tr className="grid grid-cols-7">
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  29
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  30
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  31
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  1
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  2
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  3
                </span>
              </td>
              <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  4
                </span>
              </td>
            </tr>
            {/* <!-- Line 5 --> */}
          </tbody>
        </table>
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </>
  );
};

export default Calendar;
