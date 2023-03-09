import Swal from "sweetalert2";
import Backend from "./Backend";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  // didOpen: (toast) => {
  //     toast.addEventListener('mouseenter', Swal.stopTimer)
  //     toast.addEventListener('mouseleave', Swal.resumeTimer)
  // }
});

export const toastAlert = (icon, message) => {
  Toast.fire({
    icon: icon,
    title: message,
    timer: 2000,
  });
};


export const getApiData = (routeName) => {
  return Backend.get(routeName)
    .then(({ data, status }) => {
      return { data, status };
    })
    .catch((err) => {
      const response = {
        data: {},
        status: err?.response?.status,
      };
      apiErrorAlert(err.response.status, err.response.data.message);
      return response;
    });
};

export const putApiData = async (routeName, params) => {
  return Backend.put(routeName, params)
    .then(({ data, status }) => {
      return { data, status };
    })
    .catch((err) => {
      const status = err.response === undefined ? 12023 : err.response.status;
      const message =
        err.response === undefined
          ? "Server Maintenance!"
          : err.response.data.message;
      apiErrorAlert(status, message);
      return {
        data: {},
        status,
      };
    });
};

export const postApiData = async (routeName, params) => {
  return Backend.post(routeName, params)
    .then(({ data, status }) => {
      return { data, status };
    })
    .catch((err) => {
      const status = err.response === undefined ? 12023 : err.response.status;
      const message =
        err.response === undefined
          ? "Server Maintenance!"
          : err.response.data.message;
      apiErrorAlert(status, message);
      return {
        data: {},
        status,
      };
    });
};

export const deleteApiData = async (routeName, params) => {
  return Backend.delete(routeName, params)
    .then(({ data, status }) => {
      return { data, status };
    })
    .catch((err) => {
      const status = err.response === undefined ? 12023 : err.response.status;
      const message =
        err.response === undefined
          ? "Server Maintenance!"
          : err.response.data.message;
      apiErrorAlert(status, message);
      return {
        data: {},
        status,
      };
    });
};

// Error Alerts
const apiErrorAlert = (status, message) => {
  switch (status) {
    case 204:
      Toast.fire({ icon: "error", title: "Server not responding" });
      break;
    case 401:
      Toast.fire({ icon: "warning", title: message });
      break;
    case 404:
      Toast.fire({ icon: "error", title: "Server cannot be found" });
      break;
    case 405:
      Toast.fire({ icon: "warning", title: message });
      break;
    case 422:
      Toast.fire({ icon: "warning", title: message });
      break;
    case 502:
      Toast.fire({ icon: "error", title: "Server Error" });
      break;
    case 12023:
      Toast.fire({ icon: "error", title: message });
      break;
    default:
      Toast.fire({
        icon: "error",
        title: `Returned error request ${status}!. Please try again later`,
      });
      break;
  }
};
