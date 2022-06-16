import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import {getDogs, getDogsAlphabetically, getDogsByName, getDogsByOrigin, getDogsByTemper, getDogsByWeight} from '../../actions'
import { NavLink } from 'react-router-dom'
import SelectTemper from '../SelectTemper/SelectTemper'

export default function NavBar({setPage, setOrder}) {
    let dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleSelectAlphabet = (e) => {
        if(e.target.value === 'default') return dispatch(getDogs())

        setPage(1)
        dispatch(getDogsAlphabetically(e.target.value))
        e.target.value === 'ascendant' ? setOrder('Ascending in alphabetical order!') : setOrder('Descending in alphabetical order!') //obligatorio para re-renderizar home
    }

    const handleSelectWeight = (e) => {
        if(e.target.value === 'default') return dispatch(getDogs())

        setPage(1)
        dispatch(getDogsByWeight(e.target.value))
        e.target.value === 'ascendant' ? setOrder('Ascending by weight order!') : setOrder('Descending by weight order!')
    }

    const handleSelectTemper = (e) => {
        if(e.target.value === 'Temperamentos') return dispatch(getDogs())
        
        dispatch(getDogsByTemper(e.target.value))
    }

    const handleSelectOrigin= (e) => {
        if(e.target.value === 'Origen') return dispatch(getDogs())
        
        dispatch(getDogsByOrigin(e.target.value))
    }

    return (
        <div>
            <input 
            type="text"
            placeholder='Nombre de raza...'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => dispatch(getDogsByName(name))}>Buscar</button>
            <NavLink to='/create'>
                <button>Crear raza</button>
            </NavLink>
            <h1>Filtrar por:</h1>
            <SelectTemper handleSelect={handleSelectTemper}/>
            <select onChange={(e) => handleSelectOrigin(e)} defaultValue='Origen'>
                <option value="Origen">Origen</option>
                <option value="API">API</option>
                <option value="Created">Creada</option>
            </select>
            <h1>Ordenar por orden alfabetico:</h1>
            <select onChange={(e) => handleSelectAlphabet(e)} defaultValue='default'>
                <option value="default">Sin Orden</option>
                <option value="ascendant">A-Z</option>
                <option value="descendant">Z-A</option>
            </select>
            <h1>Ordenar por peso:</h1>
            <select onChange={(e) => handleSelectWeight(e)} defaultValue='default'>
                <option value="default">Peso</option>
                <option value="ascendant">ASC</option>
                <option value="descendant">DESC</option>
            </select>
        </div>
    )
}
