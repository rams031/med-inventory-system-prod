import Swal from "sweetalert2";
import Backend from "./Backend";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
});

export const dialogAlert = (message, action) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
};

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
      const {
        response: { data },
        status,
      } = err || {};
      const { errno } = data || {};
      const response = {
        data: {},
        status: err?.response?.status,
      };

      if (status === 400) {
        dbErrorAlert(errno);
      } else {
        apiErrorAlert(err.response.status, err.response.data.message);
      }

      return response;
    });
};

export const putApiData = async (routeName, params) => {
  return Backend.put(routeName, params)
    .then(({ data, status }) => {
      return { data, status };
    })
    .catch((err) => {
      const {
        response: { data },
      } = err || {};
      const { errno } = data || {};

      const status = err.response === undefined ? 12023 : err.response.status;
      const message =
        err.response === undefined
          ? "Server Maintenance!"
          : err.response.data.message;

      if (status === 400) {
        dbErrorAlert(errno);
      } else {
        apiErrorAlert(status, message);
      }

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
      const {
        response: { data },
      } = err || {};
      const { errno } = data || {};
      const status = err.response === undefined ? 12023 : err.response.status;
      const message =
        err.response === undefined
          ? "Server Maintenance!"
          : err.response.data.message;

      if (status === 400) {
        dbErrorAlert(errno);
      } else {
        apiErrorAlert(status, message);
      }

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
      const {
        response: { data },
      } = err || {};
      const { errno } = data || {};
      const status = err.response === undefined ? 12023 : err.response.status;
      const message =
        err.response === undefined
          ? "Server Maintenance!"
          : err.response.data.message;

      if (status === 400) {
        dbErrorAlert(errno);
      } else {
        apiErrorAlert(status, message);
      }

      return {
        data: {},
        status,
      };
    });
};

const dbErrorAlert = (errno) => {
  switch (errno) {
    case 1062:
      Toast.fire({
        icon: "error",
        title: "Some of the data are already taken.",
      });
      break;
  }
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
