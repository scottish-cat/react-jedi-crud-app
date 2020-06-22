import React, { useState } from 'react';
import Table from '../common/Table';
import Form from '../common/Form';

const data = []

const columns = data.length ? Object.keys(data[0]) : [];

function Starships() {
    if (!localStorage.getItem('starships')) {
        localStorage.setItem('starships', JSON.stringify(data));
    } 

    const [starships, setStarships] = useState(JSON.parse(localStorage.getItem('planets')));

    const handleStarship = (starshipData) => {
        const data = [...starships, starshipData];
        setStarships(data);
        localStorage.setItem('starships', JSON.stringify(data));
    }

    const getInitialStarshipData = () => {
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    }

    const handleDelete = id => {
        const data = starships.filter(starship => starship.id !== id); 
        setStarships(data);
        localStorage.setItem('starships', JSON.stringify(data));
    }

    return (
        <div className="container">
            <h2 className="text-dark">Starships from Star Wars Universe</h2>
            {data.length ? <Table
                data={starships}
                columns={columns}
                tableDescriptor="Starships"
                handleDelete={handleDelete}
            /> : <p className="text-dark">No info about starships is available.</p>}
            <Form
                initialData={getInitialStarshipData()}
                columns={columns}
                onAddData={handleStarship}
            />
        </div>
    );
}

export default Starships;
