import React, { Component } from 'react';
import moment from 'moment';
import { Table, Button, Input, Layout } from 'antd';
import TopMenu from "components/TopMenu";
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
        waitingList: [] // maintain a priority list with 10 people
    }
    componentDidMount() {
        /* 
          if there are emergency patients, they will always be top priority
          second top priority are people made appointment, if it is already appointment time, people will be put in waiting list immediately
          the lowest priority are walk in patient     
        */
        const { patientList } = this.props;
        const emergencyPatientList = patientList.filter((({ section }) => section === "emergency"));
        const appointmentPatientList = patientList.filter((({ section }) => section === "appointment"));
        const walkInPatientList = patientList.filter((({ section }) => section === "walkin"));
        if (emergencyPatientList.length >= 10) this.setState({ waitingList: emergencyPatientList });
        else {
            const waitingList = emergencyPatientList;
            if (appointmentPatientList.length > 0) {
                for (let i = 0; i < appointmentPatientList.length; i += 1) {
                    const appointmentTime = moment(appointmentPatientList[i].date);
                    const currentTime = moment();
                    if (waitingList.length >= 10) break;
                    else if (appointmentTime <= currentTime) waitingList.push(appointmentPatientList[i]);
                }
            }
            if (walkInPatientList.length > 0) {
                for (let i = 0; i < walkInPatientList.length; i += 1) {
                    if (waitingList.length >= 10) break;
                    else waitingList.push(walkInPatientList[i]);
                }
            }
            this.setState({ waitingList });
        }

    }
    updateStatus = (record) => {
        const { dispatch } = this.props;
        const { waitingList } = this.state;
        const updatedWaitingList = waitingList.map(elem => {
            const { id } = elem;
            return id === record.id ? { ...elem, status: "served" } : elem;
        });
        this.setState({ waitingList: updatedWaitingList });
        dispatch({ type: "UPDATE_RECORD", payload: { ...record, status: "served" } });
    }
    render() {
        const { waitingList: patientList } = this.state;
        const tableHeaders = patientList.length > 0 ? Object.keys(patientList[0]) : [];
        const columns = tableHeaders.map(header =>
            (
                {
                    title: header,
                    dataIndex: header,
                    key: header,
                }
            )

        );
        const columnsWithAction = [...columns,
        {
            title: "Action",
            key: "updateStatus",
            render: (_, record) => <a onClick={() => this.updateStatus(record)}>Update Status</a>
        }
        ];
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
                    />
                </Content>
            </Layout>
        );
    }
}