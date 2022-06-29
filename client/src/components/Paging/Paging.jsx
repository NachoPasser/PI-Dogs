import React, {useState} from 'react'
import s from './Paging.module.css'
export default function Paging({setNumber, max, actualPage}) {
    const [inputValue, setInputValue] = useState('')
    let pages = []
   
    for (let i = 1; i <= max; i++) {
            pages.push(i)
    }

    function handleChange(e){
        let num = Number(e.target.value)
        if(!isNaN(num) && num >= 1 && num <= 22){
            setInputValue(num)
        }
        
        if(!e.target.value){
            setInputValue('')
        }
    }

    return (
        <div className={s.paging}>
            <div className={s.arrowsContainer}>
                <button className={s.arrows} disabled={actualPage === 1 ? true : false} onClick={() => setNumber(prev => prev - 1)}>🡰</button>
                <span>{actualPage} de {max}</span>
                <button className={s.arrows} disabled={actualPage === max ? true : false} onClick={() => setNumber(prev => prev + 1)}>🡲</button>
            </div>
            <div className={s.search}>
                <input id={s.input} type="text" placeholder='Ir a la pagina...' value={inputValue} onChange={handleChange}/>
                <button id={s.go} disabled={inputValue ? false : true} onClick={() =>{
                    setInputValue('')    
                    setNumber(parseInt(inputValue))}}
                >🔍</button>
            </div>
        </div>
    )
}
