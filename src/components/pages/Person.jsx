import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import Form from '../common/Form';

import Joi from '@hapi/joi';

function Person() {
    const { id } = useParams();
    const history = useHistory();
    let people = JSON.parse(localStorage.getItem('people'));

    const getKeysNames = () => {
        return people.length ? Object.keys(people[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    const personData = () => {
        let person;
        if (id !== 'new') {
            person = people.filter(person => +person.id === +id)[0];
        } else {
            person = getKeysNames().reduce((cols, columnName) => {
                cols[columnName.replace(/\s+/g, '_')] = "";
                return cols;
            }, {})
        }

        return person;
    }

    const handleAppPerson = (personData) => {
        if (id !== 'new') {
            const personIndex = people.findIndex(person => +person.id === +personData.id);
            people[personIndex] = {...people[personIndex], ...personData};
        } else {
            personData.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            people = [...people, personData];
        }

        localStorage.setItem('people', JSON.stringify(people));
        history.goBack();
    }

    const validationScheme = () => {
        return {
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
        
            height: Joi.number()
                .required()
                .integer(),
            
            mass: Joi.number()
                .integer()
                .required(),
        
            gender: Joi.string()
                .required(),
        
            birth_year: Joi.number()
                .integer() 
                .required(),
            
            id: Joi.number()
        }
    }

    return (
        <div className="container">
            <h2 className="text-dark">Add new person to Star Wars Universe</h2>
            <Form
                initialData={personData()}
                columns={getKeysNames()}
                onAddData={handleAppPerson}
                schema={validationScheme()}
            />
        </div>
    );
}

export default Person;
