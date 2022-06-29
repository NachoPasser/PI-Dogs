import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import { getDogById } from '../../actions';
import Loader from '../Loader/Loader';
import s from './Detail.module.css'
import not_found from '../../images/not_found.png'

export default function Detail() {
    const {id} = useParams()
    let history = useHistory()
    let dispatch = useDispatch()
    const dog = useSelector(state => state.dogFromId)
    let data = {}
    
    if(dog.hasOwnProperty('name')) organizeData()

    function organizeData(){
      data = {name: dog.name}

      if(dog.hasOwnProperty('temperament')) data.temperament = `Sus temperamentos son ${dog.temperament}`
      else data.temperament = 'No tiene un temperamento definido'

      if(dog.height.split(' - ').length !== 1) data.height = `Mide entre ${dog.height} cm`
      else data.height = `Mide ${dog.height} cm`
      
      if(dog.weight !== 'Peso no especificado'){
        if(dog.weight.split(' - ').length !== 1) data.weight = `Pesa entre ${dog.weight} kg`
        else data.weight = `Pesa ${dog.weight} kg`
      } else{
        data.weight = 'No tiene un peso definido'
      }

      let life_span = dog.life_span.slice(0, -5)
      if(life_span.split(' - ').length !== 1) data.life_span = `Vive entre ${life_span} años`
      else data.life_span = `Vive ${life_span} años`
    }

    useEffect(() => {
        dispatch(getDogById(id))
        return function deleteDetail(){
          dispatch(getDogById('NaN'))
        }
    }, [])

  return (
    <div className={s.body}>
      <div className={s.detail}>
        <button id={s.btn} onClick={() => history.goBack()}>🡰Volver</button>
        {!dog.hasOwnProperty('image') ? <img id={s.img} src={not_found} alt="" /> : <img id={s.img} src={dog.image} alt="" />}
        <div className={s.card}>
          {!dog.hasOwnProperty('name') ? <Loader imgStyle={s.loaderImg} textStyle={s.loaderText}/> : null}
          <span>{data.name}</span>
          <span>{data.temperament}</span>
          <span>{data.height}</span>
          <span>{data.weight}</span>
          <span>{data.life_span}</span>
        </div>
      </div>
    </div>
  )
}
