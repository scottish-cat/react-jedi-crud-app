import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import Joi from '@hapi/joi';

const Form = ({columns, initialData, onAddData, schema}) => {
    const [personData, setPersonData] = useState(initialData);
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = (event) => {
        event.preventDefault();
        const validation = Joi.object(schema).validate(personData);
        validation.error ? setErrorMessage(validation.error.message) : onAddData(personData);
    }

    const handleChange = (event) => {
        const { currentTarget : input } = event;
        const data = {...personData};
        data[input.name.replace(/\s+/g, '_')] = input.value;
        setPersonData(data);
    }

    return (
        <form>
            {columns.map( columnName => (
                <Input
                key={columnName}
                name={columnName}
                label={columnName}
                value={personData[columnName.replace(/\s+/g, '_')]}
                type="input"
                onChange={handleChange}
                />
            ))}
            <p className={`text-danger ${errorMessage ? 'd-block' : 'd-none'}`}>{errorMessage}</p>
            <Button
                label="Save"
                classes="alert alert-danger"
                onClick={handleClick}
            />
        </form>
    );
};

export default Form;
