import axios from 'axios'
export const getDogs = () => {
    return function(dispatch){
        axios.get('http://localhost:3001/dogs')
        .then(dogs => dispatch({type: 'GET_DOGS', payload: dogs.data}))
    }
}

export const getTemperaments = () => {
    return function(dispatch){
        axios.get('http://localhost:3001/temperaments')
        .then(tempers => dispatch({type: 'GET_TEMPERAMENTS', payload:tempers.data}))
    }
}

export const getDogsByName = (name) => {
    return function(dispatch){
        axios.get(`http://localhost:3001/dogs?name=${name}`)
        .then(dogs => dispatch({type: 'GET_DOGS_BY_NAME', payload: dogs.data}))
        .catch(e => alert('No se encontro ninguna raza!'))
    }
}

export const getDogById = (id) => {
    return function(dispatch){
        axios.get(`http://localhost:3001/dogs/${id}`)
        .then(dog => dispatch({type: 'GET_DOG_BY_ID', payload: dog.data}))
    }
}
export const getDogsAlphabetically = (order) => {
    return ({type: 'SORT_ALPHABETICALLY', payload: order})     
}

export const getDogsByWeight = (order) => {
    return ({type: 'SORT_BY_WEIGHT', payload: order})  
}

export const getDogsByTemper = (temperament) => {
    return ({type: 'FILTER_BY_TEMPERAMENT', payload: temperament})
}

export const getDogsByOrigin = (origin) => {
    return ({type: 'FILTER_BY_ORIGIN', payload: origin})
}

