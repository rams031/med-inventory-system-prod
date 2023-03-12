import logo from "./logo.svg";
import "./App.css";
import { Routes, useNavigate } from "react-router";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { LoginRoutes, ManagementRoutes, AccessRoutes } from "./Layout/Layout";
import { useEffect } from "react";
// import { accessRoutes, accessRoutes } from "./Routes/routes";

function App() {
  const navigate = useNavigate();
  const emailAuthorization = localStorage.getItem("email");

  useEffect(() => {
    if (emailAuthorization) return navigate('admin/medicine');

     
  }, [])

  return (
    <div className="App">
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>

          {/* Account Login Routes */}
          {!emailAuthorization && LoginRoutes}
          {emailAuthorization && ManagementRoutes}
          {AccessRoutes}
        </Routes>
      </QueryParamProvider>
    </div>
  );
}

export default App;
