import React from 'react'
import { useDispatch } from 'react-redux'
import { getDogs, getDogsByTemper, getDogsByOrigin } from '../../actions'
import SelectTemper from '../SelectTemper/SelectTemper'
import bone from '../../images/bone2.png'
import s from './Filter.module.css'
export default function Filter({state, setState}) {
    let dispatch = useDispatch()

    const handleSelectTemper = (e) => {
        setState({
            alphabet: '',
            weight: '',
            origin: '',
            name: '',
            temper: e.target.value
        })

        if(e.target.value === 'Temperamentos'){ 
            return dispatch(getDogs())
        }
        
        dispatch(getDogsByTemper(e.target.value))
    }

    const handleSelectOrigin= (e) => {
        setState({
            alphabet: '',
            weight: '',
            origin: e.target.value,
            name: '',
            temper: ''
        })
        if(e.target.value === 'Origen') return dispatch(getDogs())
        
        dispatch(getDogsByOrigin(e.target.value))
    }

    return (
        <div className={s.filters}>
                    <h1>Filtros</h1>
                    <SelectTemper style={s.filterTemper} handleSelect={handleSelectTemper} value={state.temper}/>
                    <select id={s.filterOrigin} onChange={(e) => handleSelectOrigin(e)} value={state.origin}>
                        <option value="Origen">Origen</option>
                        <option value="API">API</option>
                        <option value="Created">Creada</option>
                    </select>
                    <div className={s.filterBones}>
                        <img className={s.bone1} src={bone} alt="" />
                        <img className={s.bone2} src={bone} alt="" />
                    </div>
        </div>
    )
}
