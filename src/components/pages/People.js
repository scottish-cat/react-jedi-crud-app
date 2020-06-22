import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Table from  '../common/Table';
import Button from '../common/Button';

import { getPeople } from "../../services/swApiService";

const noDataMessage = 'No info about people is available.';

function People() {
    const initialData = JSON.parse(localStorage.getItem('people')); 
    const [people, setPeople] = useState(initialData ? initialData : []);
    const [textMessage, setTextMessage] = useState('Loading data...');
    const history = useHistory();

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

    const handleDelete = id => {
        const data = people.filter(person => person.id !== id);
        setPeople(data);
        localStorage.setItem('people', JSON.stringify(data));
    }

    const handleChangeRoute = () => {
        history.push('people/new');
    } 

    const getColumnNames = () => {
        return people.length ? Object.keys(people[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    return (
        <div className="container">
            <h2 className="text-dark">People from Star Wars Universe</h2>
            <Button
                label="Create person"
                classes="btn btn-outline-warning mb-3"
                onClick={handleChangeRoute}
            />
            {people.length ? <Table
                data={people}
                columns={getColumnNames()}
                tableDescriptor="People"
                handleDelete={handleDelete}
            />  : <p className="text-dark">{textMessage}</p>}
        </div>
    );
}

export default People;
