import React from "react";
// AntD
import { Typography, Tag, Row, Col, Button, Icon } from "antd";
import { DownCircleTwoTone, StopTwoTone, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

const Columns = {
    date: {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 200,
        align: 'center',
        fixed: 'left',
        sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    status: {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        fixed: 'left',
        filters: [
            {
                text: 'Đã thu',
                value: true
            },
            {
                text: 'Chưa thu',
                value: false
            }
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        render(status) {
            return (
                <Tag
                    color={status ? 'blue' : 'red'}>
                    {status ? 'Đă thu' : 'Chưa thu'}
                </Tag>
            )
        }
    },
    shipper: {
        title: 'Shipper',
        dataIndex: 'shipper',
        key: 'shipper',
        width: 250,
        fixed: 'left',
        render(shipper) {
            return (
                <Typography.Text strong style={{ textTransform: "uppercase" }}>
                    {shipper ? shipper[1] : ''}
                </Typography.Text>
            )
        }
    },
    till: {
        title: 'Till',
        dataIndex: 'till',
        key: 'till',
        width: 80,
        sorter: (a, b) => a.till - b.till,
    },
    bill: {
        title: 'Bill',
        dataIndex: 'bill',
        key: 'bill',
        width: 80,
        sorter: (a, b) => a.bill - b.bill,
    },
    cash: {
        title: 'Cash',
        dataIndex: 'cash',
        key: 'cash',
        width: 80,
        align: 'center',
        sorter: (a, b) => a.cash - b.cash,
    },
    price: {
        title: 'Price (VNĐ)',
        dataIndex: 'price',
        key: 'price',
        width: 150,
        align: 'right',
        sorter: (a, b) => a.currency - b.currency,
        render(currency, record) {
            return (
                <Typography.Text code strong style={{ color: record.status ? 'blue' : 'red', fontSize: '18px' }}>
                    {currency}
                </Typography.Text>
            )
        }
    },
    address: {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 500,
    },
    note: {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
        width: 200,
    },
    action: {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: 250,
        align: 'center',
        fixed: 'right',
        render(action, record) {
            return (
                <Row
                    justify="space-around"
                    align="middle">
                    <Col span={8}>
                        {record.status ? <StopTwoTone /> : <DownCircleTwoTone />}
                    </Col>
                    <Col span={8}>
                        <EditTwoTone />
                    </Col>
                    <Col span={8}>
                        <DeleteTwoTone />
                    </Col>
                </Row>
            );
        }
    }
}

export default React.createContext({ Columns });