import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [userView, setUserView] = useState("login");

  const loginDisplay = () => {
    return userView === "login" ? (
      <form class="form-control flex flex-col gap-2 w-full max-w-xs">
        <div className="text-3xl text-gray-600 font-bold">Login</div>
        <hr />
        <div className="font-semibold">Sign in to start your session</div>
        <div>
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input type="text" placeholder="Username" class="formInput" />
        </div>
        <div>
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="password" placeholder="Password" class="formInput" />
        </div>
        <div className="flex flex-row justify-between pt-2">
          <button
            onClick={() => setUserView("register")}
            class="btn bg-yellow-500 text-white border-0"
          >
            Register
          </button>
          <Link
            class="btn bg-yellow-500 text-white border-0"
            to="/admin/medicine"
          >
            Login
          </Link>
        </div>
      </form>
    ) : null;
  };

  const registerDisplay = () => {
    return userView === "register" ? (
      <form class="form-control flex flex-col gap-1 w-full">
        <div className="text-xl text-gray-600 font-bold">
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
                <span class="label-text">First Name</span>
              </label>
              <input type="text" placeholder="First Name" class="formInput" />
            </div>
            <div>
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
            </div>
            <div>
              <label class="label">
                <span class="label-text">Address</span>
              </label>
              <input type="text" placeholder="Address" class="formInput" />
            </div>
            <div>
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
            </div>
            <div>
              <label class="label">
                <span class="label-text">Position</span>
              </label>
              <select class="formSelect">
                <option disabled selected>
                  Pick one
                </option>
                <option>Nurse</option>
                <option>Staff</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input type="text" placeholder="Username" class="formInput" />
            </div>
            <div>
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input type="password" placeholder="Password" class="formInput" />
            </div>
            <div>
              <label class="label">
                <span class="label-text">Confirm Password</span>
              </label>
              <input type="password" placeholder="Password" class="formInput" />
            </div>
            <div className="flex flex-row justify-between pt-2">
              <button
                onClick={() => setUserView("login")}
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
      <div className="flex justify-center items-center border-t-4 bg-white border-yellow-300 p-6 shadow-lg">
        {loginDisplay()}
        {registerDisplay()}
      </div>
    </div>
  );
}

export default Login;
