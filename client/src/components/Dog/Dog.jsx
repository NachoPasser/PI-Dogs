import React from 'react'
import s from './Dog.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDogById } from '../../actions'
export default function Dog(props) {
    let dispatch = useDispatch()
    return (
        <div className={s.card}>
            <NavLink to={`/dog/${props.id}`} onClick={() => dispatch(getDogById(props.id))}>
            <img className={s.img} src={props.imagen} alt="NOT FOUND" />\
            </NavLink>
            <div className={s.text}>
                <span>{props.nombre}</span>
                <br />
                {props.temperamento ? <span>{props.temperamento}</span> : <span>Temperamento no especificado</span>}
                <br />
                {props.peso === 'Peso no especificado' ? <span>{props.peso}</span> : <span>{props.peso} kg</span>}
            </div>
        </div>
    )
}
