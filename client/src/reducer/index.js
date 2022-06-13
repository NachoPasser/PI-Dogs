const initialState = {
    dogs: [],
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case 'SET_DOGS': 
            return {
                dogs: action.payload 
            }
        default:
            return state
    }
}