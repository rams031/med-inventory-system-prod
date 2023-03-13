import React, { useRef } from "react";
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import ReactToPrint from "react-to-print";
// import { BiFilter } from "react-icons/bi";

// Component
import "./Table.css";
import SearchBar from "./SearchBar";
import PrintTable from "./PrintTable";
import Bootstraptable from "./Bootstraptable";
import { PrinterIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/outline";

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
  const navigate = useNavigate();
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
      return props.baseProps.data ? (
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
      ) : null
    }

    const withoutData = () => {
      return !props.baseProps.data ? (
        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-yellow-200 bg-white animate-spin fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      ) : null
    }

    return (
      <>
        {withData()}
        {withoutData()}
      </>
    )

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
                <div className="text-patonegreen bg-snow hover:bg-lightgray border-2 border-patonegreen shadow-md font-medium rounded-md text-sm px-5 py-1.5 text-center inline-flex items-center mr-2 mb-2">
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
                    className=" text-patonegreen bg-snow hover:bg-lightgray border-2 border-patonegreen shadow-md font-medium rounded-md text-sm px-5 py-1.5 text-center inline-flex items-center mr-2 mb-2"
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
    </div>
  );
};

export default React.memo(Table);
