import React from "react";

const TableCols = {
    date: {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 200,
        align: 'center',
        sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    till: {
        title: 'Till',
        dataIndex: 'till',
        key: 'till',
        width: 80,
        sorter: (a, b) => a.till - b.till
    },
    bill: {
        title: 'Bill',
        dataIndex: 'bill',
        key: 'bill',
        width: 80,
        sorter: (a, b) => a.bill - b.bill
    },
    cash: {
        title: 'Cash',
        dataIndex: 'cash',
        key: 'cash',
        width: 80,
        align: 'center',
        sorter: (a, b) => a.cash - b.cash
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
}

export default React.createContext({
    TableCols,
})