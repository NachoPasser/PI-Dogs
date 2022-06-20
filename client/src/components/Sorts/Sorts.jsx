import React from 'react'
import s from './Sorts.module.css'
import { useDispatch } from 'react-redux'
import { getDogsByWeight, getDogsAlphabetically } from '../../actions'
export default function Sorts({state, setState}) {
  let dispatch = useDispatch()

  const handleSelectAlphabet = (e) => {

    setState({
        ...state,
        alphabet: e.target.value,
        weight: ''
    })

    if(e.target.value === 'default') return

    dispatch(getDogsAlphabetically(e.target.value))
    // e.target.value === 'ascendant' ? setOrder('Ascending in alphabetical order!') : setOrder('Descending in alphabetical order!') //obligatorio para re-renderizar home
}

  const handleSelectWeight = (e) => {

    setState({
        ...state,
        weight: e.target.value,
        alphabet: ''
    })

    if(e.target.value === 'default') return
    
    dispatch(getDogsByWeight(e.target.value))
    // e.target.value === 'ascendant' ? setOrder('Ascending by weight order!') : setOrder('Descending by weight order!')
  }

  return (
    <div className={s.sorts}>
                <h1>Órdenes</h1>
                <select id={s.sortAlpha} onChange={(e) => handleSelectAlphabet(e)} value={state.alphabet}>
                    <option value="default">Alfabético</option>
                    <option value="ascendant">A-Z</option>
                    <option value="descendant">Z-A</option>
                </select>
                <select id={s.sortWeight} onChange={(e) => handleSelectWeight(e)} value={state.weight}>
                    <option value="default">Peso</option>
                    <option value="ascendant">ASC</option>
                    <option value="descendant">DESC</option>
                </select>
            </div>
  )
}
