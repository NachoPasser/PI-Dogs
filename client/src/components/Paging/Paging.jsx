import React from 'react'

export default function Paging({number, setNumber, max}) {
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
            <button onClick={(e) => handleClick(e)}>{number}</button>
            )}
        </div>
    )
}
