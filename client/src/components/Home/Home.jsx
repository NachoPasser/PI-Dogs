import React, { useEffect, useState } from 'react'
import s from './Home.module.css'
import { getDogs } from '../../actions'
import {useDispatch, useSelector} from 'react-redux'
import Dog from '../Dog/Dog'
import Paging from '../Paging/Paging'
import Loader from '../Loader/Loader'
import Filter from '../Filter/Filter'
import Sorts from '../Sorts/Sorts'
import bone from '../../images/bone3.png'
import SearchName from '../SearchName/SearchName'
import dogHouse from '../../images/dog-house.png'
import { Link } from 'react-router-dom'

export default function Home() {
    let dispatch = useDispatch()
    let dogs = useSelector((state) => state.dogs)
    const [select, setSelect] = useState({
        alphabet: '',
        weight: '',
        temper: '',
        origin: ''
    })
    const [numberOfPage, setNumberOfPage] = useState(1)
    const [order, setOrder] = useState('')
    let maxNumberOfPages = 0
    const cardsPerPage = 8
    
    
    useEffect(() => {
        dispatch(getDogs())
    }, [])

    useEffect(() => {
        setNumberOfPage(1)
    }, [dogs])
    
    if(dogs.length > 0) maxNumberOfPages = Math.ceil(dogs.length / cardsPerPage)
     
    //(numberOfPage - 1) * cardsPerPage 0*8=0, 1*8=8, 2*8=16
    //(numberOfPage - 1) * cardsPerPage + cardsPerPage 0*8+8 = 8, 1*8+8=16, 2*8 + 8=24
    return (
        <div className={s.body}>
            <img id={s.dogHouse} src={dogHouse} alt="" />
            <Link to='/create'>
                <button id={s.create} >Crear raza</button>
            </Link>
            <div className={s.filterBones}>
                <img className={s.bone} src={bone} alt="" />
                <img className={s.bone} src={bone} alt="" />
            </div>
            <div className={s.sortsBones}>
                <img className={s.bone} src={bone} alt="" />
                <img className={s.bone} src={bone} alt="" />
            </div>
            <SearchName/>
            <Filter state={select} setState={setSelect}/>
            <Sorts  state={select} setState={setSelect}/>
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
            <Paging className={s.paging}setNumber={setNumberOfPage} max={maxNumberOfPages} actualPage={numberOfPage} />  
        </div>
    )
}
