import React, { useState } from 'react';
import Table from '../common/Table';
import Form from '../common/Form';

const data = []

const columns = data.length ? Object.keys(data[0]) : [];

function Starships() {
    const [starships, setStarships] = useState(data);

    const handleStarship = (starshipData) => {
        const data = [...starships, starshipData];
        setStarships(data)
    }

    const getInitialStarshipData = () => {
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    }

    const handleDelete = id => {
        setStarships(starships.filter(starship => starship.id !== id));
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