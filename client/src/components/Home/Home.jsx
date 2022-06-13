import React, { useEffect, useState } from 'react'
import s from './Home.module.css'
import { getDogs } from '../../actions'
import {useDispatch, useSelector} from 'react-redux'
import Dog from '../Dog/Dog'
import NavBar from '../NavBar/NavBar'
import Paging from '../Paging/Paging'
export default function Home() {
    const [numberOfPage, setNumberOfPage] = useState(1)
    let maxNumberOfPages = 0
    const cardsPerPage = 8
    
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogs())
    }, [])
    //Una vez pulsas el boton se lanza una accion que ordena alfabeticamente, si lo volves a clicker se lanza
    //getDogs(). Lo que vamos a estar cambiando es el valor de la variable 'dogs' de Home.
    //Lo mismo con peso
    let dogs = useSelector((state) => state.dogs)
    console.log(dogs)
    if(dogs.length > 0) console.log(dogs[0].weight.split(' - '))
    if(dogs.length > 0) maxNumberOfPages = Math.ceil(dogs.length / cardsPerPage)
     
    //3 ordenes:
    //Alfabetico
    //Por Id (default)
    //Por peso
    //Slice: 0 -> 8, 8 -> 16
    //(numberOfPage - 1) * cardsPerPage 0*8=0, 1*8=8, 2*8=16
    //(numberOfPage - 1) * cardsPerPage + cardsPerPage 0*8+8 = 8, 1*8+8=16, 2*8 + 8=24
    return (
        <div>
            <NavBar/>
            <div className={s.cards}>
                {dogs && 
                dogs.slice(
                    (numberOfPage - 1) * cardsPerPage,
                    (numberOfPage - 1) * cardsPerPage + cardsPerPage
                ).map(d => <Dog
                    key={d.id}
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
