import React, {setEffect}from 'react'
import { useHistory } from 'react-router-dom'
import s from './Landing.module.css'
import dog1 from '../../images/dogBanner1.png'
import dog2 from '../../images/dogBanner2.png'
import bone from '../../images/bone1.png'
function Landing() {
    const history = useHistory();

    function handleClick() {
        history.push("/home");
    }

    return (
        <div className={s.body}>
            <img id={s.dog1} src={dog1} alt="" />
            <img id={s.dog2} src={dog2} alt="" width={800} />
            <img id={s.bone} src={bone} alt="" />
            <div className={s.banner}>
             <div className={s.bannerText}>
                <h1 className={s.h1}>Dogs APP</h1>
             </div>
            </div>

            <button id={s.btn} onClick={() => handleClick()}>INGRESAR</button>
        </div>
    )

}

export default Landing;
