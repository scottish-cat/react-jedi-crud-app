import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import Form from '../common/Form';

import Joi from '@hapi/joi';

function Starship() {
    const { id } = useParams();
    const history = useHistory();
    let starships = JSON.parse(localStorage.getItem('starships'));

    const getKeysNames = () => {
        return starships.length ? Object.keys(starships[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    const starshipData = () => {
        let starship;
        if (id !== 'new') {
            starship = starships.filter(starship => +starship.id === +id)[0];
        } else {
            starship = getKeysNames().reduce((cols, columnName) => {
                cols[columnName.replace(/\s+/g, '_')] = "";
                return cols;
            }, {})
        }

        return starship;
    }

    const handleAddStarship = (starshipData) => {
        if (id !== 'new') {
            starships = starships.filter(starship => starship.id !== starshipData.id);
        } else {
            starshipData.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        }

        localStorage.setItem('starships', JSON.stringify([...starships, starshipData]))
        history.goBack();
    }

    const validationScheme = () => {
        return {
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
        
            model: Joi.string()
                .min(3)
                .max(30)
                .required(),
            
            crew: Joi.number()
                .required(),
        
            passengers: Joi.string()
                .required(),
        
            cost_in_credits: Joi.string()
                .required(),
            
            id: Joi.number()
        }
    }

    return (
        <div className="container">
            <h2 className="text-dark">Add new starship to Star Wars Universe</h2>
            <Form
                initialData={starshipData()}
                columns={getKeysNames()}
                onAddData={handleAddStarship}
                schema={validationScheme()}
            />
        </div>
    );
}

export default Starship;
