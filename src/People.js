import React, { useState } from 'react';
import Table from "./components/common/Table";
import Form from './components/common/Form'

const data = [
    {first: 'Mark', last: 'Otto', handle: '@motto', id: '1'},
    {first: 'Carl', last: 'Reno', handle: '@ceno', id: '2'},
    {first: 'Steve', last: 'Smith', handle: '@ssteve', id: '3'}
]

const columns = Object.keys(data[0]);

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

    const handleDelete = item => {
        setPeople(people.filter(person => item !== person));
    }

    return (
        <div className="container">
            <Table
                data={people}
                columns={columns}
                tableDescriptor="People"
                handleDelete={handleDelete}
            />
            <Form
                initialData={getInitialPersonData()}
                columns={columns}
                onAddData={handleAppPerson}
            />
        </div>
    );
}

export default People;
