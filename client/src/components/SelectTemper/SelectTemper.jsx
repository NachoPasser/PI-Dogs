import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTemperaments } from '../../actions'

export default function SelectTemper({handleSelect, style, value, disabled}){
  const temperaments = useSelector(state => state.temperaments)

  return (
    <div id={style}>
        <select disabled={disabled} style={{"fontFamily": 'Fredoka One'}} onChange={(e) => handleSelect(e)} value={value}>
                <option  value="Temperamentos">Temperamentos</option>
                {temperaments.length > 0 && temperaments.map(temper => 
                <option value={temper.name} key={temper.id}>
                    {temper.name}
                </option>)}
      </select>
    </div>
  )
}
