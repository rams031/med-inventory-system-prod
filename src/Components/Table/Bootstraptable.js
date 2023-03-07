import React from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";

const Bootstraptable = ({ tableData, showLoader }) => {
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

    return (
      <BootstrapTable
        {...tableData.baseProps}
        pagination={paginationConfig}
        noDataIndication={"No data available"}
      />
    );
  };

  return !showLoader ? <div>{tableDisplay()}</div> : null;
};

export default Bootstraptable;
