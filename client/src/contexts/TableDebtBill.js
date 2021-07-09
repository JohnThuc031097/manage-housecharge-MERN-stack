import React, { useState } from "react";
//AntD
import { Tag, Typography, Row, Col, Button } from "antd";
// import { SearchOutlined } from "@ant-design/icons";

const getFiltersDate = (year, month) => {
    if (Array.isArray(year) && year.length > 0) {
        if (Array.isArray(month) && month.length > 0) {
            const result = year.reduce((dataYear, yearCrr, index) => {
                const monthChildrens = [];
                const monthTotal = month[index];
                if (monthTotal) {
                    for (let i = 1; i < monthTotal + 1; i++) {
                        monthChildrens.push({
                            text: `Tháng ${i}`,
                            value: `${i < 10 ? `0${i}` : i}/${yearCrr}`
                        });
                    }
                }
                dataYear.push(
                    {
                        text: `Năm ${yearCrr}`,
                        value: yearCrr,
                    },
                    {
                        text: `Năm ${yearCrr}`,
                        value: `Month of Year ${yearCrr}`,
                        children: monthChildrens
                    }
                );
                return dataYear;
            }, []);
            return result;
        }
    }
    return [];
}

const TableDebtBillContext = React.createContext({
    columns: [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 110,
            fixed: 'left',
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            filters: getFiltersDate([2021, 2020], [12, 10]),
            onFilter: (value, record) => {
                console.log(value, record.date);
                return record.date.includes(value);
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            fixed: 'left',
            filters: [
                {
                    text: true,
                    value: true
                },
                {
                    text: false,
                    value: false
                }
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render(status) {
                return (
                    <Tag
                        color={status ? 'green' : 'red'}>
                        {status ? 'Đă thu' : 'Chưa thu'}
                    </Tag>
                )
            }
        },
        {
            title: 'Shipper',
            dataIndex: 'shipper',
            key: 'shipper',
            width: 200,
            fixed: 'left',
            render(shipper) {
                return (
                    <Typography.Text strong style={{ textTransform: "uppercase" }}>
                        {shipper ? shipper[1] : ''}
                    </Typography.Text>
                )
            }
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
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
        {
            title: 'Till',
            dataIndex: 'till',
            key: 'till',
            width: 80,
            sorter: (a, b) => a.till - b.till
        },
        {
            title: 'Bill',
            dataIndex: 'bill',
            key: 'bill',
            width: 80,
            sorter: (a, b) => a.bill - b.bill
        },
        {
            title: 'Cash',
            dataIndex: 'cash',
            key: 'cash',
            width: 80,
            align: 'center',
            sorter: (a, b) => a.cash - b.cash
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 500,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            width: 200,
        },
        {
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
                        <Col span={10}>
                            <Button type="primary" style={{ width: '100%', borderRadius: '5px', backgroundColor: record.status ? 'red' : 'green' }}>{record.status ? 'Unconfirm' : 'Confirm'}</Button>
                        </Col>
                        <Col span={10}>
                            <Row style={{ flexDirection: "column" }} >
                                <Col span={24} style={{ marginBottom: '10px' }}>
                                    <Button type="dashed" style={{ width: '100%' }}>Edit</Button>
                                </Col>
                                <Col span={24}>
                                    <Button style={{ width: '100%', borderRadius: '5px', backgroundColor: 'rgb(241, 150, 45)', color: 'white' }}>Remove</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                );
            }
        }
    ],
    dataFake: [
        {
            key: '1',
            date: '06/04/2021',
            status: true,
            shipper: [1, 'Nguyễn Vũ Minh Thức'],
            till: '1253',
            bill: '1200',
            cash: '05',
            currency: '120.500',
            address: '101/5E Tan Tien, X.Xuân Thởi Đông, H.Hóc Môn, TP.HCM'
        },
        {
            key: '2',
            date: '08/06/2021',
            status: true,
            shipper: [2, 'Nguyễn Văn Quang'],
            till: '1253',
            bill: '1000',
            cash: '06',
            currency: '333.500',
            address: '101/5E Tan Tien, X.Xuân Thởi Đông, H.Hóc Môn, TP.HCM'
        },
        {
            key: '3',
            date: '04/05/2020',
            status: false,
            shipper: [],
            till: '1111',
            bill: '4808',
            cash: '01',
            currency: '356.820',
            address: '101/5E Tan Tien, X.Xuân Thởi Đông, H.Hóc Môn, TP.HCM'
        },
        {
            key: '4',
            date: '02/06/2021',
            status: true,
            shipper: [3, 'Hùng Văn Dũng'],
            till: '1624',
            bill: '1422',
            cash: '10',
            currency: '520.000',
            address: '101/5E Tan Tien, X.Xuân Thởi Đông, H.Hóc Môn, TP.HCM'
        },
        {
            key: '5',
            date: '06/05/2020',
            status: false,
            shipper: [],
            till: '1355',
            bill: '1300',
            cash: '21',
            currency: '1.000.000.000',
            address: 'TOA NHA SO 10 DUONG SO 4 KHU PHAN MEN QUANG TRUNG P. TAN CHANH HIEP Q12 P. TAN CHANH HIEP Q12 P. TAN CHANH HIEP Q12 P. TAN CHANH HIEP Q12'
        },
        {
            key: '5',
            date: '06/05/2020',
            status: false,
            shipper: [],
            till: '1355',
            bill: '1300',
            cash: '21',
            currency: '1.000.000.000',
            address: 'BVDK MY DUC PHU NHUAN 43R/2-43R/4 HO VAN HUE P9 PHU NHUAN'
        },
        {
            key: '5',
            date: '06/05/2020',
            status: false,
            shipper: [],
            till: '1355',
            bill: '1300',
            cash: '21',
            currency: '1.000.000.000',
            address: '97B QUANG TRUNG P8 QUAN GO VAP TRUONG MAM NON VIET MY'
        },
        {
            key: '5',
            date: '06/05/2020',
            status: false,
            shipper: [],
            till: '1355',
            bill: '1300',
            cash: '21',
            currency: '1.000.000.000',
            address: '183/36/32 NGUYEN VAN KHOI (CAY TRAM) F8 QGV'
        }
    ]
});

export default TableDebtBillContext;