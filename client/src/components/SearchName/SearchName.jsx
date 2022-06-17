import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {getDogsByName} from '../../actions'
import sp from '../Paging/Paging.module.css'
import s from './SearchName.module.css'
export default function SearchName() {
    let dispatch = useDispatch()
    const [name, setName] = useState('')
  return (
    <div className={s.search}>
                <input id={sp.input} type="text"  placeholder='Nombre de raza...' value={name} onChange={(e) => setName(e.target.value)}/>
                <button id={sp.go} disabled={name ? false : true} onClick={() => dispatch(getDogsByName(name))}>🔍</button>
    </div>
  )
}
