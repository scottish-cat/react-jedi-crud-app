import React, { useEffect, useState } from 'react';
import Table from '../common/Table';
import Form from '../common/Form';
import { getPlanets } from "../../services/swApiService";

const noDataMessage = 'No info about planets is available.';

function Planets() {
    const initialData = JSON.parse(localStorage.getItem('planets')); 
    const [planets, setPlanets] = useState(initialData ? initialData : []);
    const [textMessage, setTextMessage] = useState('Loading data...');

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

    const handlePlanet = (planetData) => {
        const data = [...planets, planetData];
        setPlanets(data);
        localStorage.setItem('planets', JSON.stringify(data));
    }

    const getInitialPlanetData = () => {
        return getColumnNames().reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    }

    const handleDelete = id => {
        const data = planets.filter(planet => planet.id !== id);
        setPlanets(data);
        localStorage.setItem('planets', JSON.stringify(data));
    }

    const getColumnNames = () => {
        return planets.length ? Object.keys(planets[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    return (
        <div className="container">
            <h2 className="text-dark">Planets from Star Wars Universe</h2>
            {planets.length ? <Table
                data={planets}
                columns={getColumnNames()}
                tableDescriptor="Planets"
                handleDelete={handleDelete}
            />  : <p className="text-dark">{textMessage}</p>}
            <Form
                initialData={getInitialPlanetData()}
                columns={getColumnNames()}
                onAddData={handlePlanet}
            />
        </div>
    );
}

export default Planets;
