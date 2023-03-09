import React from "react";
import Table from "../Table/Table";

function Medicine() {
  const medicineList = [
    {
      image:
        "https://cdn.shopify.com/s/files/1/0559/1269/3916/products/Biogesic_-500mg-Tablet-10s-UNILAB-INC.-United-Laboratories_-Incorporated-1660658035_grande.jpg?v=1660658037",
      name: "Biogesic",
      status: true,
      quantity: 10,
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0559/1269/3916/products/Biogesic_-500mg-Tablet-10s-UNILAB-INC.-United-Laboratories_-Incorporated-1660658035_grande.jpg?v=1660658037",
      name: "Biogesic",
      status: true,
      quantity: 10,
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0559/1269/3916/products/Biogesic_-500mg-Tablet-10s-UNILAB-INC.-United-Laboratories_-Incorporated-1660658035_grande.jpg?v=1660658037",
      name: "Biogesic",
      status: true,
      quantity: 10,
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0559/1269/3916/products/Biogesic_-500mg-Tablet-10s-UNILAB-INC.-United-Laboratories_-Incorporated-1660658035_grande.jpg?v=1660658037",
      name: "Biogesic",
      status: true,
      quantity: 10,
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0559/1269/3916/products/Biogesic_-500mg-Tablet-10s-UNILAB-INC.-United-Laboratories_-Incorporated-1660658035_grande.jpg?v=1660658037",
      name: "Biogesic",
      status: true,
      quantity: 10,
    },
    {
      image:
        "https://mnlessentials.com/wp-content/uploads/2021/05/Parasaph-1.jpg",
      name: "Paracetamol",
      status: true,
      quantity: 10,
    },
  ];

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
      text: "Name",
    },
    {
      dataField: "status",
      text: "Status",
    },
    {
      dataField: "quantity",
      text: "Quantity",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col gap-4 px-16 py-10 bg-yellow-50">
      <div>
        <Table
          TableData={medicineList}
          Columns={medicineColumn}
          TableTitle={"Medicine"}
          AddButton={() =>
            <label for="my-modal" class="btn bg-yellow-600">
              open modal
            </label>
          }
          //   refreshOption={renderGlobalData}
        />
      </div>
    </div>
  );
}

export default Medicine;
