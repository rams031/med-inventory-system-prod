import Category from "../Components/Admin/Category/Category";
import Login from "../Components/Login/Login";
import Accounts from "../Components/Admin/Accounts/Accounts";
import Medicine from "../Components/Admin/Medicine/Medicine";
import Patient from "../Components/Admin/Patient/Patient";
import QrMedicine from "../Components/Admin/QRMedicine/QRMedicine";
import Barangay from "../Components/SuperAdmin/Barangay/Barangay";
import ManageAccounts from "../Components/SuperAdmin/Accounts/ManageAccounts";

export const accessRoutes = [
  {
    component: <QrMedicine />,
    path: "medicinedetails",
  },
];

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
  {
    component: <Accounts />,
    title: "Accounts",
    path: "accounts",
  },
];

export const superAdminRoutes = [
  {
    component: <Barangay />,
    title: "Barangay",
    path: "barangay",
  },
  {
    component: <ManageAccounts />,
    title: "Accounts",
    path: "accounts",
  },
];
