import { Route } from "react-router";
import { loginRoutes, adminRoutes } from "./../Routes/routes";
import React, { Suspense } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";

// Account Login Navigation
export const LoginRoutes =
  loginRoutes.length > 0 &&
  loginRoutes.map((item, index) => {
    return (
      <>
        <Route
          key={index}
          path={item.path}
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex justify-center align-items h-full">
                  Loading...
                </div>
              }
            >
              {item.component ? item.component : null}
            </Suspense>
          }
        />
      </>
    );
  });

export const managementRoutes = (
  <Route
    path="admin"
    element={
      <React.Suspense
        fallback={
          <div className="min-h-screen flex justify-center align-items h-full">
            Loading...
          </div>
        }
      >
        {/* <AdminLayouts /> */}
        <Sidebar />
      </React.Suspense>
    }
  >
    {adminRoutes.length > 0 &&
      adminRoutes.map((item, index) => {
        return (
          <>
            <Route
              key={index}
              path={item.path && item?.path}
              element={
                <React.Suspense
                  fallback={
                    <div className="min-h-screen flex justify-center align-items h-full">
                      Loading...
                    </div>
                  }
                >
                  {item.component && item?.component}
                </React.Suspense>
              }
            />
          </>
        );
      })}
    {/* Error Directory */}
    <Route
      path="*"
      element={
        <React.Suspense
          fallback={
            <div className="min-h-screen flex justify-center align-items h-full">
              Loading...
            </div>
          }
        >
          <div className="min-h-screen flex justify-center align-items h-full">
            PAGE NOT FOUND
          </div>
        </React.Suspense>
      }
    />
  </Route>
);
