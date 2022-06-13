import axios from 'axios'
export const getDogs = () => {
    return function(dispatch){
        axios('http://localhost:3001/dogs')
        .then(dogs => dispatch({type: 'SET_DOGS', payload: dogs.data}))
    }
}

export const getDogsAlphabetically = (order) => {
    return function(dispatch){
        axios('http://localhost:3001/dogs')
        .then(dogs => {
            order === 'ascendant' 
            ? dogs.data.sort((a,b) => a.name.localeCompare(b.name))
            : dogs.data.sort((a,b) => b.name.localeCompare(a.name))
            dispatch({type: 'SET_DOGS', payload: dogs.data})
        })
    }
}

export const getDogsByWeight = (order) => {
    return function(dispatch){
        axios('http://localhost:3001/dogs')
        .then(dogs => {
            order === 'ascendant' 
            ? dogs.data.sort((a,b) => {
                return a.weight.split(' - ')[0] - b.weight.split(' - ')[0]
              })
            : dogs.data.sort((a,b) =>{
                return parseInt(b.weight.split(' - ')[0]) - parseInt(a.weight.split(' - ')[0])
              })
            dispatch({type: 'SET_DOGS', payload: dogs.data})
        })
    }
}