import React, { Component, Fragment } from 'react';
import { Table, Divider, Tag } from 'antd';
import TopMenu from "components/TopMenu";
import '../app.css';

const parsedTableData = patientList => {
    const tableHeaders = Object.keys(patientList[0]);
    const columns = tableHeaders.map(header =>
        (
            {
                title: header,
                dataIndex: header,
                key: header,
            }
        )

    );
    const data = patientList.map((patient, index) => ({ ...patient, key: index }));
    return { data, columns };
}
export default class Patients extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({ type: "FETCH_USER" });
    }
    render() {
        const { patientList } = this.props;
        console.log(patientList);
        const { columns, data } = patientList.length > 0 ? parsedTableData(patientList) : { data: [], columns: [] };
        return (
            <Fragment>
                <TopMenu />
                <Table columns={columns} dataSource={data} />
            </Fragment>
        );
    }
}
