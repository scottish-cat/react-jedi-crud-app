import React, { useState } from 'react';
import Table from  '../common/Table';
import Form from '../common/Form';

const data = [
    {first: 'Mark', last: 'Otto', handle: '@motto', id: '1'},
    {first: 'Carl', last: 'Reno', handle: '@ceno', id: '2'},
    {first: 'Steve', last: 'Smith', handle: '@ssteve', id: '3'}
]

const columns = data.length ? Object.keys(data[0]) : [];

function People() {
    const [people, setPeople] = useState(data);
    console.log(people);

    const handleAppPerson = (personData) => {
        const data = [...people, personData];
        setPeople(data)
    }

    const getInitialPersonData = () => {
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    }

    const handleDelete = id => {
        setPeople(people.filter(person => person.id !== id));
    }

    return (
        <div className="container">
            <h2 className="text-dark">People from Star Wars Universe</h2>
            {data.length ? <Table
                data={people}
                columns={columns}
                tableDescriptor="People"
                handleDelete={handleDelete}
            />  : <p className="text-dark">No info about people is available.</p>}
            <Form
                initialData={getInitialPersonData()}
                columns={columns}
                onAddData={handleAppPerson}
            />
        </div>
    );
}

export default People;
