import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Table from '../common/Table';
import Button from '../common/Button';

import { getStarships } from "../../services/swApiService";

const noDataMessage = 'No info about starships is available.';

function Starships() {
    const initialData = JSON.parse(localStorage.getItem('starships')); 
    const [starships, setStarships] = useState(initialData ? initialData : []);
    const [textMessage, setTextMessage] = useState('Loading data...');
    const history = useHistory();

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

    const handleDelete = id => {
        const data = starships.filter(starship => starship.id !== id); 
        setStarships(data);
        localStorage.setItem('starships', JSON.stringify(data));
    }

    const handleChangeRoute = () => {
        history.push('starships/new');
    }  

    const getColumnNames = () => {
        return starships.length ? Object.keys(starships[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    return (
        <div className="container">
            <h2 className="text-dark">Starships from Star Wars Universe</h2>
            <Button
                label="Create starship"
                classes="btn btn-outline-warning mb-3"
                onClick={handleChangeRoute}
            />
            {starships.length ? <Table
                data={starships}
                columns={getColumnNames()}
                tableDescriptor="Starships"
                handleDelete={handleDelete}
            /> : <p className="text-dark">{textMessage}</p>}
        </div>
    );
}

export default Starships;
