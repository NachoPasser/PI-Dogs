import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDogsAlphabetically, getDogsByName, getDogsByOrigin, getDogsByTemper, getDogsByWeight, getTemperaments } from '../../actions'

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
        dispatch(getDogsByTemper(e.target.value))
    }

    const handleSelectOrigin= (e) => {
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
            <h1>Filtrar por:</h1>
            <select onChange={(e) => handleSelectTemper(e)} defaultValue='Temperamentos'>
                <option value="Temperamentos" disabled>Temperamentos</option>
                {temperaments.length > 0 && temperaments.map(temper => 
                <option value={temper.name} key={temper.id}>
                    {temper.name}
                </option>)}
            </select>
            <select onChange={(e) => handleSelectOrigin(e)} defaultValue='Raza'>
                <option value="Raza" disabled>Raza</option>
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
