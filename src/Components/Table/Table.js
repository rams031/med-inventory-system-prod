import React, { useRef } from "react";
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import ReactToPrint from "react-to-print";
import { PrinterIcon } from "@heroicons/react/outline";

// Component
import "./Table.css";
import SearchBar from "./SearchBar";
import PrintTable from "./PrintTable";
import Bootstraptable from "./Bootstraptable";

// Ito yuhg already made na table (please wag ito galawin)
const Table = ({
  TableData,
  Columns,
  TableTitle,
  AddButton,
  DateFilter,
  refreshOption,
}) => {
  const componentRef = useRef();
  const { ExportCSVButton } = CSVExport;

  const printTable = (props) => {
    return (
      <div className="hidden">
        <PrintTable
          ref={componentRef}
          tableProps={props}
          tableData={TableData}
          columns={Columns}
        />
      </div>
    );
  };

  const table = (props) => {
    const withData = () => {
      return (
        <div className="rounded-b-md mt-5 rounded-md bg-white pb-5 px-5 shadow-md">
          <div className="flex flex-row w-full justify-between ">
            <div className="flex flex-row">
              <div className="flex flex-row gap-3 items-center">
                <div>
                  {SearchBar ? <SearchBar {...props.searchProps} /> : null}
                </div>
              </div>
              <div className="hidden md:flex lg:flex w-full justify-end mt-4 lg:my-4 lg:mx-0 md:my-4 md:mx-0 ">
                {DateFilter ? <DateFilter /> : null}
              </div>
            </div>
            <div className="mt-5 lg:my-4 lg:mx-0 md:my-4 md:mx-0">
              {AddButton ? <AddButton /> : null}
            </div>
          </div>
          <div>
            <Bootstraptable tableData={props} />
          </div>
        </div>
      );
    };

    return <>{withData()}</>;
  };

  const tableTitle = (props) => {
    return (
      <div className="flex flex-row items-center">
        <div className="grow">
          <div className="flex justify-start text-4xl text-yellow-500 font-bold">
            {TableTitle}
          </div>
        </div>
        <div className="basis-1/4">
          <div className="flex flex-row justify-end bg-yellow-50">
            <div className="">
              <ExportCSVButton {...props.csvProps}>
                <div className="text-yellow-700 bg-snow hover:bg-lightgray border-2 border-yellow-600 shadow-md font-medium rounded-md text-sm px-5 py-1.5 text-center inline-flex items-center mr-2 mb-2">
                  Export
                  <div>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </ExportCSVButton>
            </div>
            <div>
              <ReactToPrint
                trigger={() => (
                  <button
                    type="button"
                    className=" text-yellow-700 uppercase bg-snow hover:bg-lightgray border-2 border-yellow-600 shadow-md font-medium rounded-md text-sm px-5 py-1.5 text-center inline-flex items-center mr-2 mb-2"
                  >
                    Print
                    <PrinterIcon className="w-4 h-4  text-patonegreen ml-2" />
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {TableData && (
        <ToolkitProvider
          keyField="dataField"
          data={TableData}
          columns={Columns}
          noDataIndication={"Test"}
          exportCSV={{
            fileName: `${TableTitle}.csv`,
            blobType: "text/plain;charset=utf-8",
            ignoreHeader: false,
          }}
          search
        >
          {(props) => (
            <>
              {tableTitle(props)}
              {table(props)}
              {printTable(props)}
            </>
          )}
        </ToolkitProvider>
      )}
      {!TableData && "LOADING PA"}
    </div>
  );
};

export default React.memo(Table);
