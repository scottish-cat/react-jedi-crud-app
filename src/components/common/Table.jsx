import React from 'react';
import { Link } from 'react-router-dom';
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
                    {columns.map(columnTitle => {
                        if (columnTitle === 'name') {
                            return (
                            <td key={item[columnTitle]+columnTitle}>
                                <Link to={`${tableDescriptor.toLowerCase()}/${item.id}`}>{item['name']}</Link>
                            </td>
                            )
                        } else {
                            return <td key={item[columnTitle]+columnTitle}>{item[columnTitle.replace(/\s/g, '_')]}</td>
                        }
                    })}
                    <td>
                    <Button
                        label="Delete"
                        classes="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                    />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;
