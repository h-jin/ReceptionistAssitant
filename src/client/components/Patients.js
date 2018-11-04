import React, { Component, Fragment } from 'react';
import { Table, Divider, Input } from 'antd';
import TopMenu from "components/TopMenu";
import '../app.css';

const parsedTableData = (patientList) => {
    const tableHeaders = Object.keys(patientList[0]);
    const columns = tableHeaders.map(header =>
        (
            {
                title: header,
                dataIndex: header,
                key: header,
                render: (text, record, index) => (
                    <Input
                        defaultValue={text}
                        onMouseLeave={e => console.log(e.target.value)}
                    />
                )
            }
        )

    );
    const columnsWithAction = [...columns, {
        title: "Action",
        key: "action",
        render: (text, record) => <a onClick={() => console.log(record)}>Delete</a>
    }];
    const data = patientList.map((patient, index) => ({ ...patient, key: index }));
    return { data, columns: columnsWithAction };
}
export default class Patients extends Component {
    state = {
        selectedRecordId: null
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({ type: "FETCH_USER" });
    }
    changeSelectedRecordId = id => {
        this.setState({ selectedRecordId: id });
    }
    changeRecord = () => {

    }
    deleteRecord = id => {
        console.log(id);
        const { dispatch } = this.props;
        dispatch({ type: "DELETE_RECORD", payload: id });
    }
    render() {
        const { patientList } = this.props;
        const { selectedRecordId } = this.state;
        //  console.log(selectedRecordId);
        // console.log(patientList);
        //  const { columns, data } = patientList.length > 0 ? parsedTableData(patientList, selectedRecordId) : { data: [], columns: [] };

        const tableHeaders = patientList.length > 0 ? Object.keys(patientList[0]) : [];
        const columns = tableHeaders.map(header =>
            (
                {
                    title: header,
                    dataIndex: header,
                    key: header,
                    render: (text, record, index) => (
                        <Input
                            defaultValue={text}
                            onMouseLeave={e => console.log(e.target.value)}
                        />
                    )
                }
            )

        );
        const columnsWithAction = [...columns, {
            title: "Action",
            key: "action",
            render: (text, { id }) => <a onClick={() => this.deleteRecord(id)}>Delete</a>
        }];
        const data = Array.isArray(patientList) ? patientList.map((patient, index) => ({ ...patient, key: index })) : [];

        return (
            <Fragment>
                <TopMenu />
                <Table
                    columns={columnsWithAction}
                    dataSource={data}
                    onRow={({ id }) => ({
                        onMouseEnter: () => this.changeSelectedRecordId(id)
                    })} />
            </Fragment>
        );
    }
}
