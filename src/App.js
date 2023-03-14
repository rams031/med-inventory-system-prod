import logo from "./logo.svg";
import "./App.css";
import { Routes, useNavigate } from "react-router";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { LoginRoutes, ManagementRoutes, AccessRoutes } from "./Layout/Layout";
import { useEffect } from "react";
// import { accessRoutes, accessRoutes } from "./Routes/routes";

function App() {

  return (
    <div className="App">
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          {/* Account Login Routes */}
          {LoginRoutes}
          {ManagementRoutes}
          {AccessRoutes}
        </Routes>
      </QueryParamProvider>
    </div>
  );
}

export default App;
