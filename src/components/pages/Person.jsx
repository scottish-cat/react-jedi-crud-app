import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import Form from '../common/Form';

function Person() {
    const { id } = useParams();
    const history = useHistory();
    const people = JSON.parse(localStorage.getItem('people'));

    const getKeysNames = () => {
        return people.length ? Object.keys(people[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    const personData = () => {
        let person;
        if (id !== 'new') {
            person = people.filter(person => person.id === id)[0];
        } else {
            person = getKeysNames().reduce((cols, columnName) => {
                cols[columnName.replace(/\s+/g, '_')] = "";
                return cols;
            }, {})
        }

        return person;
    }

    const handleAppPerson = (personData) => {
        const data = [...people, personData];
        localStorage.setItem('people', JSON.stringify(data))

        history.goBack();
    }

    return (
        <div className="container">
            <h2 className="text-dark">Add new person to Star Wars Universe</h2>
            <Form
                initialData={personData}
                columns={getKeysNames()}
                onAddData={handleAppPerson}
            />
        </div>
    );
}

export default Person;
