import React from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import renderData from "../../HOC/HOC";

const Bootstraptable = ({ tableData, showLoader, showPage }) => {
  const tableDisplay = () => {
    const paginationConfig = paginationFactory({
      page: 1,
      alwaysShowAllBtns: true,
      showTotal: true,
      withFirstAndLast: false,
      sizePerPageRenderer: ({
        options,
        currSizePerPage,
        onSizePerPageChange,
      }) => (
        <div className="dataTables_length" id="datatable-basic_length"></div>
      ),
    });

    return !showPage ? (
      <BootstrapTable
        {...tableData.baseProps}
        pagination={paginationConfig}
        noDataIndication={"No data available"}
      />
    ) : null;
  };

  return !showLoader ? <div>{tableDisplay()}</div> : null;
};

export default renderData(Bootstraptable);
