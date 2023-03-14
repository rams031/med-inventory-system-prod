import { Navigate, Route } from "react-router";
import { loginRoutes, adminRoutes, accessRoutes } from "./../Routes/routes";
import React, { Suspense } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import { AdminRestriction, LoginRestriction } from "./../HOC/RouteRestriction";

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
              <LoginRestriction>
                {item.component ? item.component : null}
              </LoginRestriction>
            </Suspense>
          }
        />
      </>
    );
  });

export const AccessRoutes =
  accessRoutes.length > 0 &&
  accessRoutes.map((item, index) => {
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

export const ManagementRoutes = (
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
                  <AdminRestriction>
                    {item.component && item?.component}
                  </AdminRestriction>
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
          <Navigate to="/admin/medicine" />
        </React.Suspense>
      }
    />
  </Route>
);
