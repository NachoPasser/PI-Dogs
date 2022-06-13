import React from 'react'
import { useHistory } from 'react-router-dom'
import s from './Landing.module.css'

function Landing() {
    const history = useHistory();

    function handleClick() {
        history.push("/home");
    }

    return (
        <div className={s.div}>
            <h1 className={s.h1}>Dogs APP</h1>
            <h2>Encuentra a tu compañero ideal!</h2>
            <button onClick={() => handleClick()}>Ingresar</button>
        </div>
    )

}

export default Landing;
