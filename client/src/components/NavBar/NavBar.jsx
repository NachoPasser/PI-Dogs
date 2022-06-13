import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDogsAlphabetically, getDogsByWeight } from '../../actions'

export default function NavBar() {
    let dispatch = useDispatch()
    const [raza, setRaza] = useState('')

    return (
        <div>
            <input 
            type="text"
            placeholder='Nombre de raza...'
            value={raza}
            onChange={(e) => setRaza(e.target.value)}/>
            <h1>Filtrar por:</h1>
            <button>Temperamento</button>
            <button>Raza</button>
            <h1>Ordenar por orden alfabetico:</h1>
            <button onClick={() => dispatch(getDogsAlphabetically('ascendant'))}>Ascendente</button>
            <button onClick={() => dispatch(getDogsAlphabetically('descendant'))}>Descendente</button>
            <h1>Ordenar por peso:</h1>
            <button onClick={() => dispatch(getDogsByWeight('ascendant'))}>Ascendente</button>
            <button onClick={() => dispatch(getDogsByWeight('descendant'))}>Descendente</button>
        </div>
    )
}
