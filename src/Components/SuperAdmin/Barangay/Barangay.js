import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

// Components
import { getApiData, postApiData, toastAlert } from "../../../Service/Service";
import { saveImageToCloud } from "../../../Service/Cloud";
import Table from "../../Table/Table";

const Barangay = () => {
  const formObject = {
    barangayLogo: "",
    barangayName: "",
    barangayDescription: "",
    barangayAddress: "",
  };
  // Local State
  const [formValues, setFormValues] = useState(formObject);
  const [barangayData, setBarangayData] = useState([]);
  const [modalType, setModalType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [image, setImage] = useState([]);

  useEffect(() => {
    getBarangayDataAction();
  }, []);

  const barangayColumn = [
    {
      dataField: "id",
      text: "Barangay ID",
    },
    {
      dataField: "barangayLogo",
      text: "Barangay Logo",
      formatter: (data, row) => {
        return (
          <figure className="flex flex-row gap-2">
            <div className="m-1">
              <img
                className="h-7 w-7 border-1 rounded-lg object-scale-down drop-shadow-lg"
                alt="barangay-photo"
                src={data ?? null}
              />
            </div>
          </figure>
        );
      },
    },
    {
      dataField: "barangayName",
      text: "Barangay Name",
    },
    {
      dataField: "barangayDescription",
      text: "Barangay Description",
    },
    {
      dataField: "barangayAddress",
      text: "Barangay Address",
    },
  ];

  // HTTP Action
  const getBarangayDataAction = async () => {
    await getApiData("/barangay").then(({ status, data }) => {
      if (status === 200) return setBarangayData(data);
    });
  };

  const newBarangayAction = async (e) => {
    e.preventDefault();
    const cloudinary = await saveImageToCloud(image);

    if (cloudinary) {
      const params = {
        ...formValues,
        barangayLogo: cloudinary,
      };

      await postApiData("/barangay/create", params)
        .then(({ status }) => {
          if (status === 200) {
            toastAlert("success", "Successfully Added");
            getBarangayDataAction();
            setImagePath("");
            setImage([]);
            setIsOpen(!isOpen);
            return setFormValues(formObject);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const inputOnChange = (e) => {
    const {
      target: { value, name },
    } = e || {};

    return setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const modalDisplay = () => {
    return (
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-sm bg-white rounded-md p-5 shadow-lg">
            <div className="flex flex-col">
              <div className="flex text-lg font-semibold text-yellow-500">
                {modalType === "add" ? "Add New" : "Edit"} Barangay
              </div>
              <form
                onSubmit={newBarangayAction}
                className="flex flex-col gap-4 form-control py-4"
              >
                <div>
                  <label class="label">
                    <span class="label-text">Barangay Name</span>
                  </label>
                  <input
                    name="barangayName"
                    type="text"
                    placeholder="Barangay Name"
                    class="formInputModal w-full"
                    value={formValues?.barangayName}
                    onChange={inputOnChange}
                    required
                  />
                </div>
                <div>
                  <label class="label">
                    <span class="label-text">Barangay Description</span>
                  </label>
                  <input
                    name="barangayDescription"
                    type="text"
                    placeholder="Barangay Description"
                    class="formInputModal w-full"
                    value={formValues?.barangayDescription}
                    onChange={inputOnChange}
                    required
                  />
                </div>
                <div>
                  <label class="label">
                    <span class="label-text">Barangay Address</span>
                  </label>
                  <input
                    name="barangayAddress"
                    type="text"
                    placeholder="Barangay Address"
                    class="formInputModal w-full"
                    value={formValues?.barangayAddress}
                    onChange={inputOnChange}
                    required
                  />
                </div>
                <div>
                  <label class="label">
                    <span class="label-text">Barangay Logo</span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    className="file-input file-input-bordered file-input-warning w-full max-w-xs"
                    accept="image/*"
                    onChange={(e) => {
                      setImagePath(URL.createObjectURL(e.target.files[0]));
                      return setImage(e.target.files[0]);
                    }}
                    required={modalType !== "update"}
                  />
                </div>
                <div className="flex flex-row justify-end gap-2">
                  <button
                    className="modalButton"
                    onClick={() => {
                      // setFormValues(formObject);
                      return setIsOpen(!isOpen);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="modalButton">
                    Submit
                  </button>
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
        Add Barangay
      </button>
    );
  };

  return (
    <>
      {modalDisplay()}
      <div className="min-h-screen flex flex-col gap-4 px-16 py-10 bg-yellow-50">
        <Table
          TableData={barangayData}
          Columns={barangayColumn}
          TableTitle={"Barangay List"}
          AddButton={AddButton}
        />
      </div>
    </>
  );
};

export default Barangay;
