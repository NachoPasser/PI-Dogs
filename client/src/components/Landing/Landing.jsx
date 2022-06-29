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
            <img id={s.dog2} src={dog2} alt="" width={800} />
            <div className={s.banner}>
             <div className={s.bannerText}>
                <img id={s.dog1} src={dog1} alt="" />
                <h1 className={s.h1}>Dogs APP</h1>
             </div>
            </div>
            <div className={s.divBone}>
            <img id={s.bone} src={bone} alt="" />
            <button id={s.btn} onClick={() => handleClick()}>INGRESAR</button>
            </div>
        </div>
    )

}

export default Landing;
