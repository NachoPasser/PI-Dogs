import React, {useState} from 'react'

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
        <div>
            <button disabled={actualPage === 1 ? true : false} onClick={() => setNumber(prev => prev - 1)}>{String.fromCharCode(8592)}</button>
            <span>{actualPage} de {max}</span>
            <button disabled={actualPage === max ? true : false} onClick={() => setNumber(prev => prev + 1)}>{String.fromCharCode(8594)}</button>
            <br />
            <input type="text" placeholder='Ir a la pagina...' value={inputValue} onChange={handleChange}/>
            <button disabled={inputValue ? false : true} onClick={() =>{
                setInputValue('')    
                setNumber(parseInt(inputValue))}}
            >IR</button>
        </div>
    )
}
