import logo from "./logo.svg";
import "./App.css";
import { Routes, useNavigate } from "react-router";
import { useJwt } from "react-jwt";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import {
  LoginRoutes,
  AdministratorRoutes,
  SuperAdministratorRoutes,
  AccessRoutes,
} from "./Layout/Layout";

// Token
const authToken = localStorage.getItem("token");

function App() {
  const { decodedToken, isExpired } = useJwt(authToken);
  console.log(`isExpired:`, isExpired);
  console.log(`decodedToken:`, decodedToken);

  return (
    <div className="App">
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          {/* Account Login Routes */}
          {LoginRoutes}
          {SuperAdministratorRoutes}
          {AdministratorRoutes}
          {AccessRoutes}
        </Routes>
      </QueryParamProvider>
    </div>
  );
}

export default App;
