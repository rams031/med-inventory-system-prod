import logo from "./logo.svg";
import "./App.css";
import { Routes } from "react-router";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { LoginRoutes, managementRoutes } from "./Layout/Layout";

function App() {
  return (
    <div className="App">
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          {/* Account Login Routes */}
          {LoginRoutes}
          {managementRoutes}
        </Routes>
      </QueryParamProvider>
    </div>
  );
}

export default App;
