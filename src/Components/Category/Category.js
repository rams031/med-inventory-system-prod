import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

// Components
import {
  deleteApiData,
  dialogAlert,
  getApiData,
  postApiData,
  putApiData,
  toastAlert,
} from "../../Service/Service";
import Table from "../Table/Table";
import Swal from "sweetalert2";

function Category() {
  // Form Object
  const formObject = {
    categoryId: "",
    categoryName: "",
  };

  // Local State
  const [formValues, setFormValues] = useState(formObject);
  const [categoryData, setCategoryData] = useState([]);
  const [modalType, setModalType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCategoryDataAction();
  }, []);

  // HTTP Action
  const getCategoryDataAction = async () => {
    await getApiData("/category").then(({ status, data }) => {
      if (status === 200) return setCategoryData(data);
    });
  };

  const newCategoryAction = async (e) => {
    e.preventDefault();

    await postApiData("/category/create", formValues).then((res) => {
      const { status } = res || {};
      if (status === 200) {
        toastAlert("success", "Successfully Added");
        getCategoryDataAction();
        setIsOpen(!isOpen);
        return setFormValues(formObject);
      }
    });
    return false;
  };

  const updateCategoryAction = async (e) => {
    e.preventDefault();

    const params = {
      categoryName: formValues?.categoryName,
      categoryId: formValues?.categoryId,
    };

    await postApiData("/category/update", params).then((res) => {
      const { status } = res || {};
      if (status === 200) {
        toastAlert("success", "Successfully Updated");
        getCategoryDataAction();
        setIsOpen(!isOpen);
        return setFormValues(formObject);
      }
    });
    return false;
  };

  const deleteCategoryAction = async (row) => {
    const { id } = row || {};

    const params = {
      categoryId: id,
    };

    await postApiData("/category/delete", params).then((res) => {
      const { status } = res || {};
      if (status === 200) {
        toastAlert("success", "Successfully Deleted");
        getCategoryDataAction();
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
                {modalType === "add" ? "Add New" : "Edit"} Category
              </div>
              <form
                onSubmit={
                  modalType === "add" ? newCategoryAction : updateCategoryAction
                }
                className="flex flex-col gap-4 form-control py-4"
              >
                <div>
                  <label class="label">
                    <span class="label-text">Category Name</span>
                  </label>
                  <input
                    name="categoryName"
                    type="text"
                    placeholder="Category Name"
                    class="formInputModal w-full"
                    value={formValues?.categoryName}
                    onChange={inputOnChange}
                    required
                  />
                </div>
                <div className="flex flex-row justify-end gap-2">
                  <button
                    className="modalButton"
                    onClick={() => {
                      setFormValues(formObject);
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
        Add Category
      </button>
    );
  };

  // Table Column
  const categoryColumn = [
    {
      dataField: "id",
      text: "Category ID",
    },
    {
      dataField: "name",
      text: "Category Name",
    },
    {
      dataField: "id",
      text: "Action",
      formatter: (data, row) => {
        const { name, id } = row || {};

        return (
          <div className="flex flex-row gap-4">
            <div
              onClick={() => {
                setFormValues({ ...row, categoryId: id, categoryName: name });
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
                  if (result.isConfirmed) return deleteCategoryAction(row);
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

  return (
    <>
      {modalDisplay()}
      <div className="min-h-screen flex flex-col gap-4 px-16 py-10 bg-yellow-50">
        <Table
          TableData={categoryData}
          Columns={categoryColumn}
          TableTitle={"Category"}
          AddButton={AddButton}
        />
      </div>
    </>
  );
}

export default Category;
