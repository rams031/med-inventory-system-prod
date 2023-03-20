import { Navigate, Route } from "react-router";
import {
  loginRoutes,
  adminRoutes,
  accessRoutes,
  superAdminRoutes,
} from "./../Routes/routes";
import React, { Suspense } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import {
  AdminRestriction,
  LoginRestriction,
  SuperAdminRestriction,
} from "./../HOC/RouteRestriction";

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

export const AdministratorRoutes = (
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
        <Sidebar routes={adminRoutes} pathSlice={7} />
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

export const SuperAdministratorRoutes = (
  <Route
    path="superadmin"
    element={
      <React.Suspense
        fallback={
          <div className="min-h-screen flex justify-center align-items h-full">
            Loading...
          </div>
        }
      >
        {/* <AdminLayouts /> */}
        <Sidebar routes={superAdminRoutes} pathSlice={12} />
      </React.Suspense>
    }
  >
    {superAdminRoutes.length > 0 &&
      superAdminRoutes.map((item, index) => {
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
                  {/* <SuperAdminRestriction> */}
                  {item.component && item?.component}
                  {/* </SuperAdminRestriction> */}
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
          <Navigate to="/superadmin/barangay" />
        </React.Suspense>
      }
    />
  </Route>
);
