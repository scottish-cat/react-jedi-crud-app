import React, { useEffect, useState } from 'react';
import Table from '../common/Table';
import Form from '../common/Form';
import { getStarships } from "../../services/swApiService";

const noDataMessage = 'No info about starships is available.';

function Starships() {
    const initialData = JSON.parse(localStorage.getItem('starships')); 
    const [starships, setStarships] = useState(initialData ? initialData : []);
    const [textMessage, setTextMessage] = useState('Loading data...');

    useEffect( () => {
        const getData = async () => {
            const data = await getStarships()
            setStarships(data);
            localStorage.setItem('starships', JSON.stringify(data));
            setTextMessage(noDataMessage);
        }

        if (!localStorage.getItem('starships')) {
            getData();
        } 
    }, [])

    const handleStarship = (starshipData) => {
        const data = [...starships, starshipData];
        setStarships(data);
        localStorage.setItem('starships', JSON.stringify(data));
    }

    const getInitialStarshipData = () => {
        return getColumnNames().reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    }

    const handleDelete = id => {
        const data = starships.filter(starship => starship.id !== id); 
        setStarships(data);
        localStorage.setItem('starships', JSON.stringify(data));
    }

    const getColumnNames = () => {
        return starships.length ? Object.keys(starships[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    return (
        <div className="container">
            <h2 className="text-dark">Starships from Star Wars Universe</h2>
            {starships.length ? <Table
                data={starships}
                columns={getColumnNames()}
                tableDescriptor="Starships"
                handleDelete={handleDelete}
            /> : <p className="text-dark">{textMessage}</p>}
            <Form
                initialData={getInitialStarshipData()}
                columns={getColumnNames()}
                onAddData={handleStarship}
            />
        </div>
    );
}

export default Starships;
