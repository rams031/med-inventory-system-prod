import Category from "../Components/Category/Category";
import Login from "../Components/Login/Login";
import Medicine from "../Components/Medicine/Medicine";
import Patient from "../Components/Patient/Patient";

export const loginRoutes = [
  {
    component: <Login />,
    path: "",
  },
];

export const adminRoutes = [
  {
    component: <Patient />,
    title: "Patient",
    path: "patient",
  },
  {
    component: <Medicine />,
    title: "Medicine",
    path: "medicine",
  },
  {
    component: <Category />,
    title: "Category",
    path: "category",
  },
];
