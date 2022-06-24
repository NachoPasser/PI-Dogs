const initialState = {
    dogs: [],
    temperaments: [],
    fixedDogs: [],
    dogFromId: {},
    dogNotFound: ''
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case 'GET_DOGS': 
            return {
                ...state,
                dogs: action.payload,
                fixedDogs: [...action.payload]
            }
        
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        
        case 'GET_DOGS_BY_NAME':
            return {
                ...state,
                dogs: action.payload
            }
        
        case 'DOG_NOT_FOUND': 
            return{
                ...state,
                dogNotFound: action.payload
            }
        
        case 'GET_DOG_BY_ID':
            return {
                ...state,
                dogFromId: action.payload
            }
        
        case 'SORT_ALPHABETICALLY':
            let sortedAlphabetically = action.payload === 'ascendant' 
            ? state.dogs.sort((a,b) => a.name.localeCompare(b.name))
            : state.dogs.sort((a,b) => b.name.localeCompare(a.name))
            return {
                ...state,
                dogs: sortedAlphabetically
            }
        
        case 'SORT_BY_WEIGHT':
            let sortedByWeight = state.dogs.sort((a,b) => {
                if(a.weight === 'Peso no especificado' && b.weight === 'Peso no especificado') return 0
                else if(a.weight === 'Peso no especificado') return 1
                else if(b.weight === 'Peso no especificado') return -1
    
                let dogA = a.weight.split(' - ')
                let dogB = b.weight.split(' - ')
                dogA = dogA.map(w => parseInt(w))
                dogB = dogB.map(w => parseInt(w))
                if(dogA[0] > dogB[0]) return 1
                if(dogA[0] < dogB[0]) return -1
                if(dogA[0] === dogB[0]){
                    if(dogA.length === 1 && dogB.length === 1) return 0
                
                    if(dogA.length > 1 && dogB.length > 1){
                        if(dogA[1] > dogB[1]) return 1
                        if(dogA[1] < dogB[1]) return -1
                        return 0
                    } else if(dogA.length === 1){
                        if(dogA[0] > dogB[1]) return 1
                        if(dogA[0] < dogB[1]) return -1
                        return 0
                    } else{
                        if(dogA[1] > dogB[0]) return 1
                        if(dogA[1] < dogB[0]) return -1
                        return 0
            }}})
            if(action.payload !== 'ascendant') sortedByWeight.reverse()
            return {
                ...state,
                dogs: sortedByWeight
            }
        
        case 'FILTER_BY_TEMPERAMENT':
            let filteredByTemper = state.fixedDogs.filter(dog => dog.temperament?.includes(action.payload))
            return {
                ...state,
                dogs: filteredByTemper
            }
        
        case 'FILTER_BY_ORIGIN':
            let filteredByOrigin = action.payload === 'API'
            ? state.fixedDogs.filter(dog => !isNaN(Number(dog.id)))
            : state.fixedDogs.filter(dog => isNaN(Number(dog.id)))
            if(!filteredByOrigin.length) {
                return {
                    ...state,
                    dogs: filteredByOrigin,
                    dogNotFound: 'No se encontró ninguna raza!'
                }
            } else{
                return {
                    ...state,
                    dogs: filteredByOrigin
                }
            }

        default:
            return state

    }
}