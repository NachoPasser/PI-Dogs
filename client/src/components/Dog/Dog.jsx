import React from 'react'
import s from './Dog.module.css'
export default function Dog(props) {
    
    return (
        <div className={s.card}>
            <img className={s.img} src={props.imagen} alt="NOT FOUND" />
            <div className={s.text}>
                <span>{props.nombre}</span>
                <br />
                {props.temperamento ? <span>{props.temperamento.split(', ').slice(0,3).join(', ')}</span> : <span>Temperamento no especificado</span>}
                <br />
                <span>{props.peso} kg</span>
            </div>
        </div>
    )
}
