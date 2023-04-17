import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

// Components
import { getApiData, postApiData, toastAlert } from "../../../Service/Service";
import Table from "../../Table/Table";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import Swal from "sweetalert2";

function ManageAccounts() {
  const formObject = {
    fullname: "",
    username: "",
    password: "",
    email: "",
    address: "",
    barangayId: null,
  };

  // Local State
  const [formValues, setFormValues] = useState(formObject);
  const [barangayData, setBarangayData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [modalType, setModalType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [accountOption, setAccountOption] = useState(false);

  useEffect(() => {
    getAccountsDataAction();
    getBarangayDataAction();
  }, []);

  // HTTP Action
  const getBarangayDataAction = async () => {
    await getApiData("/barangay").then(({ status, data }) => {
      if (status === 200) return setBarangayData(data);
    });
  };

  // HTTP Action
  const getAccountsDataAction = async () => {
    await getApiData("/account").then(({ status, data }) => {
      if (status === 200) return setAccountsData(data);
    });
  };

  const newAccountAction = async (e) => {
    e.preventDefault();

    const params = {
      ...formValues,
      accountType: accountOption ? "superAdmin" : "admin",
      barangayId: accountOption ? null : formValues?.barangayId,
    };

    if (!accountOption && formValues?.barangayId === null)
      return toastAlert("error", "Make Sure To Select Barangay.");
    await postApiData("/account/create", params)
      .then(({ status }) => {
        if (status === 200) {
          toastAlert("success", "Account Successfully Created");
          getAccountsDataAction();
          setIsOpen(!isOpen);
          return setFormValues(formObject);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const updateAccountAction = async (e) => {
    e.preventDefault();

    const params = {
      ...formValues,
      accountType: accountOption ? "superAdmin" : "admin",
      barangayId: accountOption ? null : formValues?.barangayId,
    };

    if (!accountOption && formValues?.barangayId === null)
      return toastAlert("error", "Make Sure To Select Barangay.");
    await postApiData("/account/update", params)
      .then(({ status }) => {
        if (status === 200) {
          toastAlert("success", "Account Successfully Created");
          getAccountsDataAction();
          setIsOpen(!isOpen);
          return setFormValues(formObject);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const deleteAccountAction = async (row) => {
    const { id } = row || {};

    const params = {
      categoryId: id,
    };

    await postApiData("/account/delete", params).then((res) => {
      const { status } = res || {};
      if (status === 200) {
        toastAlert("success", "Successfully Deleted");
        getAccountsDataAction();
        return setFormValues(formObject);
      }
    });
    return false;
  };

  const inputOnChange = (e) => {
    const {
      target: { value, name },
    } = e || {};

    return setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const accountsColumn = [
    {
      dataField: "id",
      text: "Account ID",
    },
    {
      dataField: "barangayName",
      text: "Barangay Name (Assigned)",
      formatter: (data, row) => {
        const { barangayName, barangayLogo } = row || {};
        return (
          <figure className="flex flex-row items-center gap-2">
            <div className="m-1">
              <img
                className="h-4 w-4 border-1 rounded-lg object-scale-down drop-shadow-lg"
                alt="barangay-photo"
                src={barangayLogo ?? null}
              />
            </div>
            <div>{barangayName ?? null}</div>
          </figure>
        );
      },
    },
    {
      dataField: "email",
      text: "Account Email",
    },
    {
      dataField: "fullname",
      text: "Account Name",
    },
    {
      dataField: "username",
      text: "Account Username",
    },
    {
      dataField: "id",
      text: "Action",
      formatter: (data, row) => {
        return (
          <div className="flex flex-row gap-4">
            <div
              onClick={() => {
                setFormValues(row);
                setModalType("update");
                return setIsOpen(!isOpen);
              }}
            >
              <PencilAltIcon className="h-5 w-5 text-yellow-700 cursor-pointer hover:shadow-lg" />
            </div>
            <div
              onClick={() => {
                return Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) return deleteAccountAction(row);
                });
              }}
            >
              <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer hover:shadow-lg" />
            </div>
          </div>
        );
      },
    },
  ];

  const modalDisplay = () => {
    return (
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-lg bg-white rounded-md p-5 shadow-lg">
            <div className="flex flex-col">
              <div className="flex text-lg font-semibold text-yellow-500">
                {modalType === "add" ? "Add New" : "Edit"} Account
              </div>
              <form
                onSubmit={
                  modalType === "add" ? newAccountAction : updateAccountAction
                }
                class="form-control flex flex-col gap-2"
              >
                <div className="flex flex-col gap-4">
                  {!accountOption && (
                    <div className="grow">
                      <label class="label">
                        <span class="label-text">Barangay</span>
                      </label>
                      <select
                        name="barangayId"
                        class="formSelect"
                        value={formValues?.barangayId}
                        onChange={inputOnChange}
                        required={true}
                      >
                        <option disabled selected>
                          Pick one
                        </option>
                        {barangayData &&
                          barangayData.map(({ barangayName, id }, index) => (
                            <option key={id} value={id}>
                              {barangayName ?? null}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  {/* Removed for future use */}
                  {/* <div class="form-control">
                    <label class="cursor-pointer label">
                      <span class="label-text">
                        Make This Account Super Administrator
                      </span>
                      <input
                        type="checkbox"
                        checked={accountOption ? "checked" : null}
                        onChange={() => setAccountOption(!accountOption)}
                        class="checkbox checkbox-warning"
                      />
                    </label>
                  </div> */}
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <div>
                      <label class="label">
                        <span class="label-text">Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        value={formValues.fullname}
                        onChange={inputOnChange}
                        required
                        placeholder="Full Name"
                        class="formInputModal w-full"
                      />
                    </div>

                    <div>
                      <label class="label">
                        <span class="label-text">Address</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formValues.address}
                        onChange={inputOnChange}
                        required
                        placeholder="Address"
                        class="formInputModal w-full"
                      />
                    </div>
                    <div>
                      <label class="label">
                        <span class="label-text">Username</span>
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formValues.username}
                        onChange={inputOnChange}
                        required
                        placeholder="Username"
                        class="formInputModal w-full"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <label class="label">
                      <span class="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={inputOnChange}
                      required
                      placeholder="Email"
                      class="formInputModal w-full"
                    />
                  </div>
                  {modalType === "add" && (
                    <div>
                      <label class="label">
                        <span class="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={inputOnChange}
                        required
                        placeholder="Password"
                        class="formInputModal w-full"
                      />
                    </div>
                  )}
                  <div className="flex flex-row justify-end gap-2 mt-2">
                    <button
                      className="modalButton"
                      onClick={() => {
                        return setIsOpen(!isOpen);
                      }}
                    >
                      Cancel
                    </button>
                    <button class="modalButton">
                      {modalType === "add" ? "Add" : "Edit"} Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  };

  const AddButton = () => {
    return (
      <button
        href="#my-modal"
        class="modalButton"
        onClick={() => {
          setModalType("add");
          return setIsOpen(!isOpen);
        }}
      >
        Add Account
      </button>
    );
  };
  return (
    <>
      {modalDisplay()}
      <div className="min-h-screen flex flex-col gap-4 px-16 py-10 bg-yellow-50">
        <Table
          TableData={accountsData}
          Columns={accountsColumn}
          TableTitle={"Manage Accounts"}
          AddButton={AddButton}
        />
      </div>
    </>
  );
}

export default ManageAccounts;
