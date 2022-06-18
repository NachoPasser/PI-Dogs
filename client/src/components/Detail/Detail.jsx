import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import { getDogById } from '../../actions';
import Loader from '../Loader/Loader';
import s from './Detail.module.css'

export default function Detail() {
    const {id} = useParams()
    let history = useHistory()
    let dispatch = useDispatch()
    const dog = useSelector(state => state.dogFromId)

    useEffect(() => {
        dispatch(getDogById(id))
        return function deleteDetail(){
          dispatch(getDogById('NaN'))
        }
    }, [])

  return (
    <div className={s.body}>
      <button id={s.btn} onClick={() => history.goBack()}>🡰Volver</button>
      <img id={s.img} src={dog.image} alt="" />
      <div className={s.card}>
        {!dog.hasOwnProperty('name') ? <Loader style={s.loader}/> : null}
        <span>{dog.name}</span>
        <span>{dog.temperament}</span>
        {!dog.hasOwnProperty('name') ? null : <span>Mide entre {dog.height} cm</span> }
        {!dog.hasOwnProperty('name') ? null : <span>Pesa entre {dog.weight} kg</span> }
        {!dog.hasOwnProperty('name') ? null : <span>Vive entre {dog.life_span.slice(0, -5)} años</span>}
      </div>
    </div>
  )
}
