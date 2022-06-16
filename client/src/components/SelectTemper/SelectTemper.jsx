import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTemperaments } from '../../actions'

export default function SelectTemper({handleSelect}){
    let dispatch = useDispatch()
    const temperaments = useSelector(state => state.temperaments)
    
    useEffect(() => {
        dispatch(getTemperaments())
    }, [])

  return (
    <div>
        <select onChange={(e) => handleSelect(e)} defaultValue='Temperamentos'>
                <option value="Temperamentos">Temperamentos</option>
                {temperaments.length > 0 && temperaments.map(temper => 
                <option value={temper.name} key={temper.id}>
                    {temper.name}
                </option>)}
      </select>
    </div>
  )
}
