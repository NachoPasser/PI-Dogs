import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDogs, getDogsAlphabetically, getDogsByName, getDogsByOrigin, getDogsByTemper, getDogsByWeight, getTemperaments } from '../../actions'
import { NavLink } from 'react-router-dom'
export default function NavBar({setPage, setOrder}) {
    let dispatch = useDispatch()
    let temperaments = useSelector(state => state.temperaments)
    const [name, setName] = useState('')

    useEffect(() => {
        dispatch(getTemperaments())
    }, [])

    const handleClickAlphabet = (order) => {
        setPage(1)
        dispatch(getDogsAlphabetically(order))
        order === 'ascendant' ? setOrder('Ascending in alphabetical order!') : setOrder('Descending in alphabetical order!') //obligatorio para re-renderizar home
    }

    const handleClickWeight = (order) => {
        setPage(1)
        dispatch(getDogsByWeight(order))
        order === 'ascendant' ? setOrder('Ascending by weight order!') : setOrder('Descending by weight order!')
    }

    const handleSelectTemper = (e) => {
        if(e.target.value === 'Temperamentos'){
            dispatch(getDogs())
        }
        dispatch(getDogsByTemper(e.target.value))
    }

    const handleSelectOrigin= (e) => {
        if(e.target.value === 'Origen'){
            dispatch(getDogs())
        }
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
            <select onChange={(e) => handleSelectTemper(e)} defaultValue='Temperamentos'>
                <option value="Temperamentos">Temperamentos</option>
                {temperaments.length > 0 && temperaments.map(temper => 
                <option value={temper.name} key={temper.id}>
                    {temper.name}
                </option>)}
            </select>
            <select onChange={(e) => handleSelectOrigin(e)} defaultValue='Origen'>
                <option value="Origen">Origen</option>
                <option value="API">API</option>
                <option value="Created">Creada</option>
            </select>
            <h1>Ordenar por orden alfabetico:</h1>
            <button onClick={() => handleClickAlphabet('ascendant')}>Ascendente</button>
            <button onClick={() => handleClickAlphabet('descendant')}>Descendente</button>
            <h1>Ordenar por peso:</h1>
            <button onClick={() => handleClickWeight('ascendant')}>Ascendente</button>
            <button onClick={() => handleClickWeight('descendant')}>Descendente</button>
        </div>
    )
}
