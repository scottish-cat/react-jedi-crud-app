import React from 'react';
import Button from './Button';

import 'bootstrap/dist/css/bootstrap.css';

function Table({columns, data, tableDescriptor, handleDelete}) {
    return (
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope="col">{tableDescriptor}</th>
                {columns.map(columnTitle => (
                    <th key={columnTitle} scope="col">{columnTitle}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={item.id}>
                    <th scope="row">{++index}</th>
                    {columns.map(columnTitle => (
                        <td key={item[columnTitle]+columnTitle}>{item[columnTitle]}</td>
                    ))}
                    <td>
                    <Button
                        label="Delete"
                        classes="btn btn-danger"
                        onClick={() => handleDelete(item)}
                    />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;
