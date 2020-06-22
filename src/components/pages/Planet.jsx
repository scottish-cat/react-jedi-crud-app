import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import Form from '../common/Form';

function Planet() {
    const { id } = useParams();
    const history = useHistory();
    const planets = JSON.parse(localStorage.getItem('planets'));

    const getKeysNames = () => {
        return planets.length ? Object.keys(planets[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    const planetData = () => {
        let planet;
        if (id !== 'new') {
            planet = planets.filter(planet => planet.id === id)[0];
        } else {
            planet = getKeysNames().reduce((cols, columnName) => {
                cols[columnName.replace(/\s+/g, '_')] = "";
                return cols;
            }, {})
        }

        return planet;
    }

    const handleAddPlanet = (planetData) => {
        const data = [...planets, planetData];
        localStorage.setItem('planets', JSON.stringify(data))

        history.goBack();
    }

    return (
        <div className="container">
            <h2 className="text-dark">Add new planet to Star Wars Universe</h2>
            <Form
                initialData={planetData}
                columns={getKeysNames()}
                onAddData={handleAddPlanet}
            />
        </div>
    );
}

export default Planet;
