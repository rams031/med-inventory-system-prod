import logo from "./logo.svg";
import "./App.css";
import { Routes } from "react-router";
import { LoginRoutes, managementRoutes } from "./Layout/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Account Login Routes */}
        {LoginRoutes}
        {managementRoutes}
      </Routes>
    </div>
  );
}

export default App;
