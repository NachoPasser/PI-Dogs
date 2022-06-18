import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDogs, getDogsByName} from '../../actions'
import sp from '../Paging/Paging.module.css'
import s from './SearchName.module.css'
export default function SearchName({state, setState}) {
  let dispatch = useDispatch()
  let error = useSelector(state => state.dogNotFound)

  const handleClick = () => {
    setState({ ...state, alphabet: '', weight: '', temper: '', origin: ''})
    if(!state.name) dispatch(getDogs())
    else dispatch(getDogsByName(state.name))
  }
  
  return (
    <div className={s.search}>
                <input id={!error ? sp.input : s.inputError} type="text"  placeholder='Nombre de raza...' value={state.name} onChange={(e) => setState({...state, name: e.target.value})}/>
                {error ? <span id={s.error}>{error}</span> : ""}
                <button id={sp.go} onClick={handleClick}>🔍</button>
    </div>
  )
}
