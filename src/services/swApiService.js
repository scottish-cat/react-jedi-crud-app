const url = 'https://swapi.dev/api'

export const getPeople = async () => {
    const peopleResponse = await (await fetch(`${url}/people`)).json();

    return  peopleResponse.results.map(({name, height, mass, gender, birth_year}) => ({
        name, height, mass, gender, birth_year, id : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) 
    }))
}

export const getPlanets = async () => {
    const planetsResponse = await (await fetch(`${url}/planets`)).json();

    return  planetsResponse.results.map(({name, climate, terrain, diameter, population}) => ({
        name, climate, terrain, diameter, population, id : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) 
    }))
}

export const getStarships = async () => {
    const starshipsResponse = await (await fetch(`${url}/starships`)).json();

    return  starshipsResponse.results.map(({name, model, crew, passengers, cost_in_credits}) => ({
        name, model, crew, passengers, cost_in_credits, id : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    }))
}
