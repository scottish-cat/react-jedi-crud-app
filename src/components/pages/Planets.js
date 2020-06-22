import React, { useState } from 'react';
import Table from '../common/Table';
import Form from '../common/Form';

const data = [
    {name: 'Tatooine', climate: 'arid', terrain: 'desert', diameter: '10465', population: '200000', created: '2014-12-09T13:50', id: '1'},
    {name: 'Alderaan', climate: 'temperate', terrain: 'grasslands, mountains', diameter: '12500', population: '2000000000', created: '2014-12-10T11:35', id: '2'},
    {name: 'Yavin IV', climate: 'temperate, tropical', terrain: 'jungle, rainforests', diameter: '10200', population: '1000', created: '2014-12-10T11:39', id: '3'},
    {name: 'Dagobah', climate: 'murky', terrain: 'swamp, jungles', diameter: '8900', population: 'unknown', created: '2014-12-10T11:42', id: '4'}
]

const columns = data.length ? Object.keys(data[0]) : [];

function Planets() {
    if (!localStorage.getItem('planets')) {
        localStorage.setItem('planets', JSON.stringify(data));
    } 

    const [planets, setPlanets] = useState(JSON.parse(localStorage.getItem('planets')));

    const handlePlanet = (planetData) => {
        const data = [...planets, planetData];
        setPlanets(data);
        localStorage.setItem('planets', JSON.stringify(data));
    }

    const getInitialPlanetData = () => {
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    }

    const handleDelete = id => {
        const data = planets.filter(planet => planet.id !== id);
        setPlanets(data);
        localStorage.setItem('planets', JSON.stringify(data));
    }

    return (
        <div className="container">
            <h2 className="text-dark">Planets from Star Wars Universe</h2>
            {data.length ? <Table
                data={planets}
                columns={columns}
                tableDescriptor="Planets"
                handleDelete={handleDelete}
            />  : <p className="text-dark">No info about planets is available.</p>}
            <Form
                initialData={getInitialPlanetData()}
                columns={columns}
                onAddData={handlePlanet}
            />
        </div>
    );
}

export default Planets;