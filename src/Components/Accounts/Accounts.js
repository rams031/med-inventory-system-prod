import React, { useEffect, useState } from "react";
import { getApiData } from "../../Service/Service";
import Table from "../Table/Table";

function Accounts() {

    // Local State
    const [formValues, setFormValues] = useState({});
    const [accountsData, setAccountsData] = useState([]);
    const [modalType, setModalType] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getAccountsDataAction();
    }, []);

    // HTTP Action
    const getAccountsDataAction = async () => {
        await getApiData("/account").then(({ status, data }) => {
            if (status === 200) return setAccountsData(data);
        });
    };

    const categoryColumn = [
        {
            dataField: "id",
            text: "Account ID",
        },
        {
            dataField: "fullname",
            text: "Account Name",
        },
        {
            dataField: "email",
            text: "Account Email",
        },
        {
            dataField: "username",
            text: "Account Username",
        },
        {
            dataField: "address",
            text: "Account Address",
        },
    ]

    return (
        <div className="min-h-screen flex flex-col gap-4 px-16 py-10 bg-yellow-50">
            <Table
                TableData={accountsData}
                Columns={categoryColumn}
                TableTitle={"Accounts"}
            />
        </div>
    )
}

export default Accounts;
