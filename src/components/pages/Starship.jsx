import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import Form from '../common/Form';

function Starship() {
    const { id } = useParams();
    const history = useHistory();
    const starships = JSON.parse(localStorage.getItem('starships'));

    const getKeysNames = () => {
        return starships.length ? Object.keys(starships[0]).filter(key => key !== 'id').map(key => key.replace(/_/g, ' ')) : [];
    }

    const starshipData = () => {
        let starship;
        if (id !== 'new') {
            starship = starships.filter(starship => starship.id === id)[0];
        } else {
            starship = getKeysNames().reduce((cols, columnName) => {
                cols[columnName.replace(/\s+/g, '_')] = "";
                return cols;
            }, {})
        }

        return starship;
    }

    const handleAddStarship = (starshipData) => {
        const data = [...starships, starshipData];
        localStorage.setItem('starships', JSON.stringify(data))

        history.goBack();
    }

    return (
        <div className="container">
            <h2 className="text-dark">Add new starship to Star Wars Universe</h2>
            <Form
                initialData={starshipData}
                columns={getKeysNames()}
                onAddData={handleAddStarship}
            />
        </div>
    );
}

export default Starship;
