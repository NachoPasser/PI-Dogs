import React, { useEffect, useState } from 'react'
import s from './Home.module.css'
import { getDogs } from '../../actions'
import {useDispatch, useSelector} from 'react-redux'
import Dog from '../Dog/Dog'
import Paging from '../Paging/Paging'
import Loader from '../Loader/Loader'
import Filter from '../Filter/Filter'
import Sorts from '../Sorts/Sorts'
import SearchName from '../SearchName/SearchName'
import dogHouse from '../../images/dog-house.png'
import { Link } from 'react-router-dom'
import { getTemperaments } from '../../actions/index'

export default function Home() {
    let dispatch = useDispatch()
    let dogs = useSelector((state) => state.dogs)
    let not_found = useSelector((state) => state.dogNotFound)
    const [select, setSelect] = useState({
        alphabet: '',
        weight: '',
        temper: '',
        origin: '',
        name: ''
    })
    const [numberOfPage, setNumberOfPage] = useState(1)
    let maxNumberOfPages = 0
    const cardsPerPage = 8

    useEffect(() => {
        dispatch(getTemperaments())
        dispatch(getDogs())
    }, [])

    useEffect(() => {
        setNumberOfPage(1)
    }, [dogs])

    if(dogs.length > 0) maxNumberOfPages = Math.ceil(dogs.length / cardsPerPage)
    
    //(numberOfPage - 1) * cardsPerPage 0*8=0, 1*8=8, 2*8=16
    //(numberOfPage - 1) * cardsPerPage + cardsPerPage 0*8+8 = 8, 1*8+8=16, 2*8 + 8=24
    return (
        <div className={dogs.length === 0 ? s.bodyNoDogs : s.bodyDogs}>
            <div className={s.column}>
                <div className={s.dogHouse}>
                    <img id={s.house} src={dogHouse} alt="" />
                    <Link to='/create'>
                        <button id={s.create}>Crear raza</button>
                    </Link>
                </div>
                <Filter state={select} setState={setSelect}/>
                <Sorts  state={select} setState={setSelect}/>
            </div>
            <div className={s.searchDog}>
                <div className={s.searchBar}>
                    <SearchName state={select} setState={setSelect}/>
                    <Paging setNumber={setNumberOfPage} max={maxNumberOfPages} actualPage={numberOfPage} />  
                </div>
                <div className={s.cards}>
                    {dogs.length === 0
                    ? not_found === ''
                    ? <Loader textStyle={s.loadingText}/>
                    : <span id={s.not_found}>No se encontró ningun perro!</span>
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
            </div>
        </div>
    )
}
