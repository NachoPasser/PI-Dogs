import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import { getDogById } from '../../actions';
import Loader from '../Loader/Loader';

export default function Detail() {
    const {id} = useParams()
    let history = useHistory()
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDogById(id))
    }, [])

    const dog = useSelector(state => state.dogFromId)
  return (
    <div>
        {!dog.hasOwnProperty('name') ? <Loader /> : null}
        <img src={dog.image} alt="" />
        <br />
        <span>{dog.name}</span>
        <br />
        <span>{dog.temperament}</span>
        <br />
        {!dog.hasOwnProperty('name') ? null : <span>{dog.height} cm</span> }
        <br />
        {!dog.hasOwnProperty('name') ? null : <span>{dog.weight} kg</span> }
        <br />
        <span>{dog.life_span}</span>
        <button onClick={() => history.goBack()}>↩ Volver</button>
    </div>
  )
}
