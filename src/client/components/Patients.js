import "lodash";
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import omit from "underscore";
import { Table, Button, Input, Layout, DatePicker, Select } from 'antd';
import TopMenu from "components/TopMenu";
import SectionSelector from "components/SectionSelector";
import '../app.css';

const { Header, Content } = Layout;

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
        updatedRecord: null
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({ type: "FETCH_USER" });
    }
    addRecord = () => {
        const { dispatch } = this.props;
        dispatch({ type: "ADD_EMPTY_RECORD", payload: { name: "mark", phone: "", status: "waiting", section: "appointment", date: moment().format("YYYY-MM-DD hh:mm:ss") } });
    }
    updateRecordState = (record, header, newValue) => {
        const updatedRecord = { ...record, [header]: newValue };
        const { dispatch } = this.props;
        this.setState({ updatedRecord });
        dispatch({ type: "UPDATE_LOCAL_RECORD", payload: _.omit(updatedRecord, "key") });
    }
    updateRecord = record => {
        const { dispatch } = this.props;
        const { updatedRecord } = this.state;
        const { id } = record;
        // id is generated automatically by database, if it is not exist it is new added record
        if (id) dispatch({ type: "UPDATE_RECORD", payload: updatedRecord });
        else dispatch({ type: "ADD_RECORD", payload: record });
    }
    deleteRecord = id => {
        const { dispatch } = this.props;
        dispatch({ type: "DELETE_RECORD", payload: id });
    }
    onSelectedTime = (value, record) => {
        const updatedRecord = { ...record, date: moment(value).format("YYYY-MM-DD hh:mm:ss") };
        const { dispatch } = this.props;
        this.setState({ updatedRecord });
        dispatch({ type: "UPDATE_LOCAL_RECORD", payload: _.omit(updatedRecord, "key") });
    }
    handleSectionChange = (value, record) => {
        const updatedRecord = { ...record, section: value };
        const { dispatch } = this.props;
        this.setState({ updatedRecord });
        dispatch({ type: "UPDATE_LOCAL_RECORD", payload: _.omit(updatedRecord, "key") });
    }
    render() {
        const { patientList } = this.props;
        const tableHeaders = patientList.length > 0 ? Object.keys(patientList[0]) : [];
        const columns = tableHeaders.map(header =>
            (
                {
                    title: header,
                    dataIndex: header,
                    key: header,
                    render: (text, record, index) => (

                        header === "date" ?
                            <DatePicker
                                defaultValue={moment(record.date)}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="Select Time"
                                onOk={(value) => this.onSelectedTime(value, record)} /> : (
                                header === "section" ?
                                    <SectionSelector defaultValue={record.section} handleSectionChange={(value) => this.handleSectionChange(value, record)} />
                                    :
                                    <Input
                                        defaultValue={text}
                                        disabled={header === "id" || header === "status" ? true : false}
                                        onChange={e => this.updateRecordState(record, header, e.target.value)}
                                    />
                            )
                    )
                }
            )

        );
        const columnsWithAction = [...columns,
        {
            title: "Action",
            key: "update",
            render: (_, record) => <a onClick={() => this.updateRecord(record)}>Update</a>
        },
        {
            title: "Action",
            key: "delete",
            render: (text, { id }) => <a onClick={() => this.deleteRecord(id)}>Delete</a>
        }];
        const data = Array.isArray(patientList) ? patientList.map((patient, index) => {
            const { date } = patient;
            return { ...patient, date: moment(date).format("YYYY-MM-DD hh:mm:ss"), key: index }
        }) : [];

        return (
            <Layout>
                <Header>
                    {/*<div style={{ width: 120, height: 31 }}>
                            <img src="/public/React-icon.png" />
                        </div>*/}
                    <TopMenu />
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Table
                        columns={columnsWithAction}
                        dataSource={data}
                    /*onRow={({ id }) => ({
                        onMouseEnter: () => this.changeSelectedRecordId(id)
                    })}*/ />
                    <Button type="primary" onClick={() => this.addRecord()}>Add</Button>
                </Content>
            </Layout>
        );
    }
}
