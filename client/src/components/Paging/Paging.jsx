import React from 'react'

export default function Paging({setNumber, max}) {
    let pages = []
    for (let i = 1; i <= max; i++) {
            pages.push(i)
    }

    function handleClick(e){
        setNumber(parseInt(e.target.innerHTML))
    }
    
    return (
        <div>
            {pages.map(number => 
            <button onClick={(e) => handleClick(e)} key={number}>{number}</button>
            )}
        </div>
    )
}
