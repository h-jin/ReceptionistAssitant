import "lodash";
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import omit from "underscore";
import { Table, Button, Input, Layout, DatePicker, notification } from 'antd';
import TopMenu from "components/TopMenu";
import SectionSelector from "components/SectionSelector";
import '../app.css';

const { Header, Content } = Layout;

const openNotification = (message, description) => {
    notification.open({
        message: message,
        description: description
    });
};

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
        openNotification("Add", "Please edit the record and click update to add it to database");
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
        if (id && updatedRecord === null) return; //user did not change anything
        if (id) dispatch({ type: "UPDATE_RECORD", payload: { ...updatedRecord, date: moment(updatedRecord.date).format("YYYY-MM-DD hh:mm:ss") } });
        else dispatch({ type: "ADD_RECORD", payload: { ...record, date: moment(record.date).format("YYYY-MM-DD hh:mm:ss") } });
        openNotification("Update", "Record is updated")
    }
    deleteRecord = id => {
        const { dispatch } = this.props;
        if (id) { // if the record exist in database
            dispatch({ type: "DELETE_RECORD", payload: id });
            openNotification("Delete", "Record is deleted");
        } else openNotification("Delete", "The record has not added to database yet, please refresh the page, it will gone.Yes this part is werid, will change it in future")
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
                    title: header.toUpperCase(),
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
            title: "ACTION",
            key: "update",
            render: (_, record) => <a onClick={() => this.updateRecord(record)}>Update</a>
        },
        {
            title: "ACTION",
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
                    <TopMenu />
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Table
                        columns={columnsWithAction}
                        dataSource={data}
                        style={{ whiteSpace: 'nowrap' }}
                        scroll={{ x: 'fit-content' }}
                    />
                    <Button type="primary"
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }} onClick={() => this.addRecord()}>Add</Button>
                </Content>
            </Layout>
        );
    }
}
