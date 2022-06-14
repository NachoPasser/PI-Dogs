import React from 'react'
import s from './Dog.module.css'
export default function Dog(props) {
    
    return (
        <div className={s.card}>
            <img className={s.img} src={props.imagen} alt="NOT FOUND" />
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
