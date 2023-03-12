import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { EyeIcon } from "@heroicons/react/outline";
import QRCode from "react-qr-code";
import axios from "axios";

// Components
import {
  getApiData,
  postApiData,
  toastAlert,
} from "../../Service/Service";
import Table from "../Table/Table";
import QRUrl from "../../Service/Network";

function Medicine() {
  // Form Object
  const formObject = {
    name: "",
    reference_no: "",
    category_id: "",
    expiration: "",
    quantity: "",
    strength: "",
    description: "",
    image: "",
  };

  // Local State
  const [formValues, setFormValues] = useState(formObject);
  const [medicineData, setMedicineData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [modalType, setModalType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [image, setImage] = useState([]);

  useEffect(() => {
    getMedicineDataAction();
    getCategoryDataAction();
  }, []);

  // HTTP Action
  const getMedicineDataAction = async () => {
    await getApiData("/medicine").then(({ status, data }) => {
      if (status === 200) return setMedicineData(data);
    });
  };

  const getCategoryDataAction = async () => {
    await getApiData("/category").then(({ status, data }) => {
      if (status === 200) return setCategoryData(data);
    });
  };

  // newMedicineAction
  const validateImage = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "isrscr1n");

    await axios
      .post(`https://api.cloudinary.com/v1_1/ddr0lfrjj/image/upload`, formData)
      .then(({ status, data }) => {
        if (status === 200 && data) {
          const { secure_url } = data || {};
          return newMedicineAction(secure_url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const newMedicineAction = async (image) => {
    const params = {
      ...formValues,
      image,
    };
    await postApiData("/medicine/create", params)
      .then(({ status }) => {
        if (status === 200) {
          toastAlert("success", "Successfully Added");
          getMedicineDataAction();
          setIsOpen(!isOpen);
          return setFormValues(formObject);
        }
      })
      .catch((err) => console.log(err));
  };

  const updateMedicineAction = async (e) => {
    e.preventDefault();

    const params = {
      medicineName: formValues?.medicineName,
      medicineId: formValues?.medicineId,
    };

    await postApiData("/medicine/update", params).then((res) => {
      const { status } = res || {};
      if (status === 200) {
        toastAlert("success", "Successfully Updated");
        getMedicineDataAction();
        setIsOpen(!isOpen);
        return setFormValues(formObject);
      }
    });
    return false;
  };

  const deleteMedicineAction = async (row) => {
    const { id } = row || {};

    const params = {
      medicineId: id,
    };

    await postApiData("/medicine/delete", params).then((res) => {
      const { status } = res || {};
      if (status === 200) {
        toastAlert("success", "Successfully Deleted");
        getMedicineDataAction();
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

  const modalDisplay = () => {

    const addModal = () => {
      return modalType === "add" ? (
        <div className="flex flex-col">
          <div className="flex text-lg font-semibold text-yellow-500">
            {modalType === "add" ? "Add New" : "Edit"} Medicine
              </div>
          <form
            onSubmit={
              modalType === "add" ? validateImage : updateMedicineAction
            }
            className="flex flex-row gap-4 form-control py-4"
          >
            <div className="flex flex-col">
              <div>
                <label class="label">
                  <span class="label-text">Medicine Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Medicine Name"
                  class="formInputModal w-full"
                  value={formValues?.name}
                  onChange={inputOnChange}
                  required
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text">Referrence No</span>
                </label>
                <input
                  name="reference_no"
                  type="text"
                  placeholder="Referrence No"
                  class="formInputModal w-full"
                  value={formValues?.reference_no}
                  onChange={inputOnChange}
                  required
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text">Category</span>
                </label>
                <select
                  name="category_id"
                  class="formSelect"
                  // value={formValues?.category_id}
                  onChange={inputOnChange}
                  required
                >
                  <option disabled selected>
                    Pick one
                      </option>
                  {categoryData &&
                    categoryData.map(({ name, id }, index) => (
                      <option key={index} value={id}>
                        {name ?? null}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label class="label">
                  <span class="label-text">Status</span>
                </label>
                <input
                  name="status"
                  type="text"
                  placeholder="Status (Optional)"
                  class="formInputModal w-full"
                  value={formValues?.status}
                  onChange={inputOnChange}
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text">Expiration</span>
                </label>
                <input
                  name="expiration"
                  type="date"
                  placeholder="status"
                  class="formInputModal w-full"
                  value={formValues?.expiration}
                  onChange={inputOnChange}
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label class="label">
                  <span class="label-text">Quantity</span>
                </label>
                <input
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  min="0"
                  class="formInputModal w-full"
                  value={formValues?.quantity}
                  onChange={inputOnChange}
                  required
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text">Strength</span>
                </label>
                <input
                  name="strength"
                  type="text"
                  placeholder="Strength"
                  class="formInputModal w-full"
                  value={formValues?.strength}
                  onChange={inputOnChange}
                  required
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text">Ingredients</span>
                </label>
                <textarea
                  name="description"
                  class="textarea textarea-bordered h-24 w-full"
                  placeholder="Ingredients"
                  value={formValues?.description}
                  onChange={inputOnChange}
                  required
                ></textarea>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <div>
                    {" "}
                    <label htmlFor="label">
                      <span class="label-text">Upload Image:</span>
                    </label>
                  </div>
                  <div>
                    <input
                      id="image-upload"
                      type="file"
                      className="file-input file-input-bordered file-input-warning w-full max-w-xs"
                      accept="image/*"
                      onChange={(e) => {
                        setImagePath(
                          URL.createObjectURL(e.target.files[0])
                        );
                        return setImage(e.target.files[0]);
                      }}
                      required
                    />
                  </div>
                </div>
                <div>
                  {imagePath && (
                    <div class="avatar px-4">
                      <div class="w-24 rounded-sm">
                        <img src={imagePath ?? ""} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-end gap-2 pt-2">
                <button
                  className="modalButton"
                  onClick={() => {
                    setFormValues(formObject);
                    setImagePath("");
                    return setIsOpen(!isOpen);
                  }}
                >
                  Cancel
                    </button>
                <button type="submit" className="modalButton">
                  Submit
                    </button>
              </div>
            </div>
          </form>
        </div>
      ) : null
    }

    const viewModal = () => {
      const { image,
        name,
        categoryName,
        strength,
        expiration,
        quantity,
        reference_no,
        description } = formValues || {};
      
      const scannerURL = `${QRUrl}/medicinedetails?image=${image}&name=${name}&categoryName=${categoryName}&strength=${strength}&expiration=${expiration}&quantity=${quantity}&reference_no=${reference_no}&description=${description}`;

      return modalType === "view" ? (
        <div className="flex flex-row gap-10 p-10">
          <div className="flex flex-col">
            <div className="flex justify-start text-xl font-bold text-yellow-500 pb-5">View Medicine Information</div>
            <div className="text-gray-500">Medicine Name: {name ?? "--"}</div>
            <div className="text-gray-500">Category Name: {categoryName ?? "--"}</div>
            <div className="text-gray-500">Reference No: {reference_no ?? "--"}</div>
            <div className="text-gray-500">Strength: {strength ?? "--"}</div>
            <div className="text-gray-500">Expiration: {expiration ?? "--"}</div>
            <div className="text-gray-500">Quantity: {quantity ?? "--"}</div>
            <div className="text-gray-500">Ingredients: {description ?? "--"}</div>
            {/* <div className="text-gray-500">{scannerURL}</div> */}
          </div>
          <div className="flex flex-col gap-6 justify-center items-center">
            <div>
              <QRCode
                size={150}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={scannerURL}
                viewBox={`0 0 256 256`}
              />
            </div>
            <img src={image} width="150" height="150" />
          </div>
        </div>


      ) : null
    }
    return (
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-auto bg-white rounded-md p-5 shadow-lg">
            {addModal()}
            {viewModal()}
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
        Add Medicine
      </button>
    );
  };

  // Table Column
  const medicineColumn = [
    {
      dataField: "image",
      text: "Image",
      formatter: (data, row) => {
        return (
          <figure className="flex flex-row gap-2">
            <div className="m-1">
              <img
                className="h-7 w-7 border-1 rounded-lg object-scale-down drop-shadow-lg"
                style={{
                  overflow: "hidden",
                }}
                src={data ?? null}
              />
            </div>
          </figure>
        );
      },
    },
    {
      dataField: "name",
      text: "Medical Name",
    },
    {
      dataField: "categoryName",
      text: "Category",
    },
    {
      dataField: "quantity",
      text: "Quantity"
    },
    {
      dataField: "strength",
      text: "Strength",
    },
    {
      dataField: "expiration",
      text: "Expiration",
    },
    {
      text: "Action",
      formatter: (data, row) => {
        const { name, id } = row || {};

        return (
          <div className="flex flex-row gap-4">
            {/* <div
              onClick={() => {
                setFormValues({ ...row, madicineId: id, madicineName: name });
                setModalType("add");
                return setIsOpen(!isOpen);
              }}
            >
              <PencilAltIcon className="h-5 w-5 text-yellow-700 cursor-pointer hover:shadow-lg" />
            </div> */}
            <div
              onClick={() => {
                setFormValues(row);
                setModalType("view");
                return setIsOpen(!isOpen);
              }}>
              <EyeIcon className="h-5 w-5 text-blue-500 cursor-pointer hover:shadow-lg" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {modalDisplay()}
      <div className="min-h-screen flex flex-col gap-4 px-16 py-10 bg-yellow-50">
        <Table
          TableData={medicineData}
          Columns={medicineColumn}
          TableTitle={"Medicine"}
          AddButton={AddButton}
        />
      </div>
    </>
  );
}

export default Medicine;
