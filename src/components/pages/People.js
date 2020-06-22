import React, { useEffect, useState } from 'react';
import Table from  '../common/Table';
import Form from '../common/Form';
import { getPeople } from "../../services/swApiService";

const noDataMessage = 'No info about people is available.';

function People() {
    const initialData = JSON.parse(localStorage.getItem('people')); 
    const [people, setPeople] = useState(initialData ? initialData : []);
    const [textMessage, setTextMessage] = useState('Loading data...');

    useEffect( () => {
        const getData = async () => {
            const data = await getPeople()
            setPeople(data);
            localStorage.setItem('people', JSON.stringify(data));
            setTextMessage(noDataMessage);
        }

        if (!localStorage.getItem('people')) {
            getData();
        } 
    }, [])

    const handleAppPerson = (personData) => {
        const data = [...people, personData];
        setPeople(data);
        localStorage.setItem('people', JSON.stringify(data))
    }

    const getInitialPersonData = () => {
        return getColumnNames().reduce((cols, columnName) => {
            cols[columnName.replace(/\s+/g, '_')] = "";
            return cols;
        }, {})
    }

    const handleDelete = id => {
        const data = people.filter(person => person.id !== id);
        setPeople(data);
        localStorage.setItem('people', JSON.stringify(data));
    }

    const getColumnNames = () => {
        return people.length ? Object.keys(people[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    return (
        <div className="container">
            <h2 className="text-dark">People from Star Wars Universe</h2>
            {people.length ? <Table
                data={people}
                columns={getColumnNames()}
                tableDescriptor="People"
                handleDelete={handleDelete}
            />  : <p className="text-dark">{textMessage}</p>}
            <Form
                initialData={getInitialPersonData()}
                columns={getColumnNames()}
                onAddData={handleAppPerson}
            />
        </div>
    );
}

export default People;
