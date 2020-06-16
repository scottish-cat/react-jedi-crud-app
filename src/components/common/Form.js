import React, { useState } from 'react';
import Input from "./Input";
import Button from "./Button";

const Form = ({columns, initialData, onAddData}) => {
    const [personData, setPersonData] = useState(initialData);

    const handleClick = (event) => {
        event.preventDefault();
        onAddData(personData);
    }

    const handleChange = (event) => {
        const { currentTarget : input } = event;
        const data = {...personData};
        data[input.name] = input.value;
        setPersonData(data)
    }


    return (
        <form className={Object.keys(personData).length ? 'd-block' : 'd-none'}>
            {columns.map( columnName => (
                <Input
                key={columnName}
                name={columnName}
                label={columnName}
                value={personData[columnName]}
                type="input"
                onChange={handleChange}
                />
            ))}
            <Button
                label="Save"
                classes="alert alert-danger"
                onClick={handleClick}
            />
        </form>
    );
};

export default Form;
