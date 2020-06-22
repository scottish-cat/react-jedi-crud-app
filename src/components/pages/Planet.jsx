import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import Form from '../common/Form';

import Joi from '@hapi/joi';

function Planet() {
    const { id } = useParams();
    const history = useHistory();
    let planets = JSON.parse(localStorage.getItem('planets'));

    const getKeysNames = () => {
        return planets.length ? Object.keys(planets[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    const planetData = () => {
        let planet;
        if (id !== 'new') {
            planet = planets.filter(planet => +planet.id === +id)[0];
        } else {
            planet = getKeysNames().reduce((cols, columnName) => {
                cols[columnName.replace(/\s+/g, '_')] = "";
                return cols;
            }, {})
        }

        return planet;
    }

    const handleAddPlanet = (planetData) => {
        if (id !== 'new') {
            planets = planets.filter(planet => planet.id !== planetData.id);
        } else {
            planetData.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        }

        localStorage.setItem('planets', JSON.stringify([...planets, planetData]))
        history.goBack();
    }

    const validationScheme = () => {
        return {
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
        
            climate: Joi.string()
                .min(3)
                .max(30)
                .required(),
            
            terrain: Joi.string()
                .min(3)
                .max(30)
                .required(),
        
            diameter: Joi.number()
                .integer()
                .required(),
        
            population: Joi.number()
                .integer() 
                .required(),
            
            id: Joi.number()
        }
    }

    return (
        <div className="container">
            <h2 className="text-dark">Add new planet to Star Wars Universe</h2>
            <Form
                initialData={planetData()}
                columns={getKeysNames()}
                onAddData={handleAddPlanet}
                schema={validationScheme()}
            />
        </div>
    );
}

export default Planet;
