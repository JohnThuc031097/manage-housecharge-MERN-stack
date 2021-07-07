import React from "react";
//AntD
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
            filters: [
                {
                    text: 'Đã thu',
                    value: 'Đã thu'
                },
                {
                    text: 'Chưa thu',
                    value: 'Chưa thu'
                }
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0
        },
        {
            title: 'Till',
            dataIndex: 'till',
            key: 'till',
            sorter: (a, b) => a.till - b.till
        },
        {
            title: 'Bill',
            dataIndex: 'bill',
            key: 'bill',
            sorter: (a, b) => a.bill - b.bill
        },
        {
            title: 'Cash',
            dataIndex: 'cash',
            key: 'cash',
            sorter: (a, b) => a.cash - b.cash
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            sorter: (a, b) => a.currency - b.currency
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note'
        }
    ],
    dataFake: [
        {
            key: '1',
            date: '06/04/2021',
            status: 'Đã thu',
            till: '1253',
            bill: '1200',
            cash: '05',
            currency: '120.500',
            note: '101/5E Tan Tien'
        },
        {
            key: '2',
            date: '08/06/2021',
            status: 'Đã thu',
            till: '1253',
            bill: '1000',
            cash: '06',
            currency: '333.500',
            note: '101/5E Tan Tien'
        },
        {
            key: '3',
            date: '04/05/2020',
            status: 'Chưa thu',
            till: '1111',
            bill: '4808',
            cash: '01',
            currency: '356.820',
            note: '101/5E Tan Tien'
        },
        {
            key: '4',
            date: '02/06/2021',
            status: 'Đã thu',
            till: '1624',
            bill: '1422',
            cash: '10',
            currency: '520.000',
            note: '101/5E Tan Tien'
        },
        {
            key: '5',
            date: '06/05/2020',
            status: 'Chưa thu',
            till: '1355',
            bill: '1300',
            cash: '21',
            currency: '1.120.500',
            note: '101/5E Tan Tien'
        }
    ]
});

export default TableDebtBillContext;