import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postApiData, toastAlert } from "../../Service/Service";

const registerObject = {
  fullname: "",
  contact_no: "",
  username: "",
  password: "",
  email: "",
  address: "",
  confirmpassword: ""
}

function Login() {
  const navigate = useNavigate();
  const [registerFormValues, setRegisterFormValues] = useState(registerObject)
  const [userView, setUserView] = useState("login");
  const [showLabel, setShowLabel] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLabel(false);
    setShowLoading(false);
  }, [])

  // Register Form Action
  const inputOnChange = (e) => {
    const {
      target: { value, name },
    } = e || {};

    return setRegisterFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const loginAction = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    const { password, username } = registerFormValues || {};
    await postApiData('/account/login', { username, password }).then(({ status, data }) => {

      if (status === 200) {
        if (data.length === 0) {
          setShowLabel(true);
          return setShowLoading(false);
        }

        const { fullname, email } = data[0] || {}
        localStorage.setItem("name", fullname);
        localStorage.setItem("email", email);

        toastAlert("success", "Log in Successfully")
        return navigate('/admin/medicine');
      }
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const registerAction = async (e) => {
    e.preventDefault();

    const { password, confirmpassword } = registerFormValues || {};
    if (password !== confirmpassword) return toastAlert("error", "Make sure to apply same password")
    console.log("registerFormValues", registerFormValues)
    await postApiData('/account/create', registerFormValues).then(({ status }) => {
      if (status === 200) {
        toastAlert("success", "Account Successfully Created")
        setUserView("login");
        return setRegisterFormValues(registerObject);
      }
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const loginDisplay = () => {
    return userView === "login" ? (
      <form onSubmit={loginAction} class="form-control flex flex-col gap-2 w-full  ">
        <div className="text-3xl text-gray-600 font-bold">Login</div>
        <hr />
        <div className="font-semibold">Sign in to start your session</div>
        {showLabel && <div className="bg-red-200 text-red-600 text-md font-semibold text-center rounded-lg py-1">Invalid Credentials</div>}
        <div>
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input type="text" name="username" value={registerFormValues.username} onChange={inputOnChange} required placeholder="Username" class="formInput" />
        </div>
        <div>
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="password" name="password" value={registerFormValues.password} onChange={inputOnChange} required placeholder="Password" class="formInput" />
        </div>
        <div className="flex flex-row justify-between items-center pt-2">
          <div
            onClick={() => setUserView("register")}
            class="btn bg-yellow-500 text-white border-0"
          >
            Register
          </div>
      
          {showLoading && <svg aria-hidden="true" class="w-8 h-8 mr-2 text-yellow-200 bg-white animate-spin fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>}
          {!showLoading &&
            <button
              disabled={showLoading}
              class="btn bg-yellow-500 text-white border-0"
              type="submit"
            >
              Login
            </button>
          }

        </div>
        <div>

        </div>
      </form>
    ) : null;
  };

  const registerDisplay = () => {
    return userView === "register" ? (
      <form onSubmit={registerAction} class="form-control flex flex-col gap-2 w-full">
        <div className="text-3xl text-gray-600 font-bold">
          Create An Account
        </div>
        <hr />
        <div className="font-semibold">
          Create an account to start your session
        </div>
        <div className="flex flex-row gap-4">
          <div>
            <div>
              <label class="label">
                <span class="label-text">Full Name</span>
              </label>
              <input type="text" name="fullname" value={registerFormValues.fullname} onChange={inputOnChange} required placeholder="Full Name" class="formInput" />
            </div>
            {/* <div>
              <label class="label">
                <span class="label-text">Middle Name</span>
              </label>
              <input type="text" placeholder="Middle Name" class="formInput" />
            </div>
            <div>
              <label class="label">
                <span class="label-text">Last Name</span>
              </label>
              <input type="text" placeholder="Last Name" class="formInput" />
            </div> */}
            <div>
              <label class="label">
                <span class="label-text">Address</span>
              </label>
              <input type="text" name="address" value={registerFormValues.address} onChange={inputOnChange} required placeholder="Address" class="formInput" />
            </div>
            <div>
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input type="text" name="username" value={registerFormValues.username} onChange={inputOnChange} required placeholder="Username" class="formInput" />
            </div>
            {/* <div>
              <label class="label">
                <span class="label-text">Sex</span>
              </label>
              <select class="formSelect">
                <option disabled selected>
                  Pick one
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div> */}
          </div>
          <div>
            <div>
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="email" name="email" value={registerFormValues.email} onChange={inputOnChange} required placeholder="Email" class="formInput" />
            </div>
            <div>
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input type="password" name="password" value={registerFormValues.password} onChange={inputOnChange} required placeholder="Password" class="formInput" />
            </div>
            <div>
              <label class="label">
                <span class="label-text">Confirm Password</span>
              </label>
              <input type="password" name="confirmpassword" value={registerFormValues.confirmpassword} onChange={inputOnChange} required placeholder="Password" class="formInput" />
            </div>
            <div className="flex flex-row justify-between pt-2">
              <button
                onClick={() => {
                  setUserView("login");
                  return setRegisterFormValues(registerObject);
                }}
                class="btn bg-yellow-500 text-white border-0"
              >
                Cancel
              </button>
              <button class="btn bg-yellow-500 text-white border-0">
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="flex justify-center items-center border-t-4 bg-white border-yellow-300 p-10 shadow-lg">
        {loginDisplay()}
        {registerDisplay()}
      </div>
    </div>
  );
}

export default Login;
