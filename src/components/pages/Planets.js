import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Table from '../common/Table';
import Button from '../common/Button';

import { getPlanets } from "../../services/swApiService";

const noDataMessage = 'No info about planets is available.';

function Planets() {
    const initialData = JSON.parse(localStorage.getItem('planets')); 
    const [planets, setPlanets] = useState(initialData ? initialData : []);
    const [textMessage, setTextMessage] = useState('Loading data...');
    const history = useHistory();

    useEffect( () => {
        const getData = async () => {
            const data = await getPlanets()
            setPlanets(data);
            localStorage.setItem('planets', JSON.stringify(data));
            setTextMessage(noDataMessage);
        }

        if (!localStorage.getItem('planets')) {
            getData();
        } 
    }, [])

    const handleDelete = id => {
        const data = planets.filter(planet => planet.id !== id);
        setPlanets(data);
        localStorage.setItem('planets', JSON.stringify(data));
    }

    const handleChangeRoute = () => {
        history.push('planets/new');
    } 

    const getColumnNames = () => {
        return planets.length ? Object.keys(planets[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    return (
        <div className="container">
            <h2 className="text-dark">Planets from Star Wars Universe</h2>
            <Button
                label="Create planet"
                classes="btn btn-outline-warning mb-3"
                onClick={handleChangeRoute}
            />
            {planets.length ? <Table
                data={planets}
                columns={getColumnNames()}
                tableDescriptor="Planets"
                handleDelete={handleDelete}
            />  : <p className="text-dark">{textMessage}</p>}
        </div>
    );
}

export default Planets;
