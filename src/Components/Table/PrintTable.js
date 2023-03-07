import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";

class PrintTable extends React.Component {
    render() {

        const tableProps = this.props?.tableProps;
        const length = tableProps?.baseProps.columns.length;
        const columns = tableProps.baseProps.columns;

        columns[length - 1].hidden = true;
        
        return (
            <div className="m-8">
                <BootstrapTable
                    {...tableProps.baseProps}
                    noDataIndication={"No activities available in table.."}
                    hover
                />
            </div>
        )
    }
}

export default React.memo(PrintTable)