import React, { useEffect, useState } from 'react'
import s from './Home.module.css'
import { getDogs } from '../../actions'
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import Dog from '../Dog/Dog'
import NavBar from '../NavBar/NavBar'
import Paging from '../Paging/Paging'
import Loader from '../Loader/Loader'

export default function Home() {
    let dispatch = useDispatch()
    let dogs = useSelector((state) => state.dogs)
    const [numberOfPage, setNumberOfPage] = useState(1)
    const [order, setOrder] = useState('')
    let maxNumberOfPages = 0
    const cardsPerPage = 8
    
    
    useEffect(() => {
        dispatch(getDogs())
    }, [])
    
    if(dogs.length > 0) maxNumberOfPages = Math.ceil(dogs.length / cardsPerPage)
     
    //(numberOfPage - 1) * cardsPerPage 0*8=0, 1*8=8, 2*8=16
    //(numberOfPage - 1) * cardsPerPage + cardsPerPage 0*8+8 = 8, 1*8+8=16, 2*8 + 8=24
    return (
        <div>
            <NavBar setPage={setNumberOfPage} setOrder={setOrder}/>
            <div className={s.cards}>
                {dogs.length === 0 
                ? <Loader/>
                : dogs.slice(
                    (numberOfPage - 1) * cardsPerPage,
                    (numberOfPage - 1) * cardsPerPage + cardsPerPage
                ).map(d => <Dog
                    key={d.id}
                    id={d.id}
                    imagen={d.image}
                    nombre={d.name}
                    temperamento={d.temperament}
                    peso={d.weight}
                    />)}
            </div>
            <Paging setNumber={setNumberOfPage} max={maxNumberOfPages} />

            
        </div>
    )
}
