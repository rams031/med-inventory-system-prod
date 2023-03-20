import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getApiData } from "../../Service/Service";

function Sidebar({ routes, pathSlice }) {
  const currentUserName = localStorage.getItem("name");
  const barangayId = localStorage.getItem("barangayId");
  const accountType = localStorage.getItem("accountType");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [barangayData, setBarangayData] = useState([]);
  const { barangayName, barangayLogo } = barangayData || {};

  useEffect(() => {
    getBarangayDataAction();
  }, []);

  // HTTP Action
  const getBarangayDataAction = async () => {
    await getApiData("/barangay/" + barangayId).then(({ status, data }) => {
      if (status === 200 && data) return setBarangayData(data[0]);
    });
  };

  // Ito po yung sa routing (function nito idisplay ung html)
  const adminRouting = (item, index) => {
    const navigationPath = () => {
      const pathClass =
        item.path === pathname?.slice(pathSlice)
          ? "bg-yellow-500 rounded-md text-white"
          : "bg-yellow-100 rounded-md text-black";

      return (
        <li key={index} className="my-2">
          <Link to={item.path}>
            <div className={pathClass}>
              <div className="flex flex-row items-center cursor-pointer h-10 px-4 rounded-lg hover:bg-antiquewhite hover:rounded-md">
                <span className="ml-3 text-sm tracking-wide   font-semibold">
                  {item.title}
                </span>
              </div>
            </div>
          </Link>
        </li>
      );
    };

    return <>{navigationPath()}</>;
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row min-h-screen">
      <div className="basis-56 hidden md:hidden lg:block shadow-xl py-5 bg-yellow-200">
        <div className="flex flex-col h-full ">
          <div className="grow relative">
            {barangayLogo && barangayName && (
              <div className="flex flex-row gap-2 items-center justify-center font-semibold text-yellow-800 w-full">
                <img
                  className="h-7 w-7 border-1 rounded-full object-scale-down"
                  alt="barangay-photo"
                  src={barangayLogo ?? null}
                />
                <div>{barangayName ?? null}</div>
              </div>
            )}
            {accountType === "superAdmin" && (
              <div className="text-center text-sm font-semibold text-yellow-800">
                Administrator
              </div>
            )}
            <div>
              <section className="flex justify-center align-center">
                <figure className="flex relative">
                  <div className="m-auto p-2 text-yellow-800">
                    <div className="text-sm text-center">
                      Health Center Hospital Inventory System
                    </div>
                  </div>
                </figure>
              </section>
            </div>
            <div className="py-3 px-5">
              <div className="flex  justify-center gap-2 text-sm bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 font-semibold rounded-full p-2 text-center">
                <div className="flex flex-row gap-1">
                  <div>
                    <Avatar name={currentUserName} size="20" round="20px" />
                  </div>
                  <div className="flex flex-col">
                    <div>{currentUserName ?? "--"}</div>
                    {/* <div className="capitalize text-xs">
                      {accountType === "superAdmin" ? "Administrator" : "User"}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ul className="overflow-y-auto px-2 py-4">
                {routes.length > 0 && routes.map(adminRouting)}
              </ul>
            </div>
          </div>
          <div className="px-2 py-4">
            <div
              className="bg-yellow-100 rounded-md text-black"
              onClick={() => {
                localStorage.clear();
                return navigate("/");
              }}
            >
              <div className="flex flex-row text-center justify-center text-yellow-700 items-center cursor-pointer h-10 px-4 rounded-lg hover:bg-yellow-700 hover:text-white   hover:rounded-md">
                <span className=" text-sm tracking-wide text-center  font-semibold">
                  Log Out
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grow">
        {/* Routes Component */}
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
