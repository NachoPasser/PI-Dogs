import React, { useEffect, useState } from 'react';
import SelectTemper from '../SelectTemper/SelectTemper';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import s from './Form.module.css'
import dog from '../../images/dogForm.png'
import dog2 from '../../images/dogForm2.png'
import sign from '../../images/sign.png'

export default function Form() {
    let history = useHistory()
    const [disabledSend, setDisabledSend] = useState(true)
    const [disabledTemper, setDisabledTemper] = useState(false)
    const [tempers, setTempers] = useState([])
    const [form, setForm] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        min_life_span: '',
        max_life_span: ''
    });
    const [errors, setError] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        min_life_span: '',
        max_life_span: ''
    })

    useEffect(() => {
        let disabled = false

        for(const prop in form){
            if(!form[prop]) disabled = true
            if(errors[prop]) disabled = true
            if(tempers.length === 0) disabled = true
        }

        if(tempers.length === 8){
            setDisabledTemper(true);
        } else{
            setDisabledTemper(false);
        }

        setDisabledSend(disabled)
    }, [form, tempers])

    
    function validate(form, field) {
        let error = {
            ...errors
        }
        switch(field){
            case 'name':
                if(!form.name) error.name = 'Nombre requerido'
                else if(!/^[a-zA-Z]+$/.test(form.name)) error.name = 'Solo puede contener letras.';
                else error.name = ''
                break;

            case 'max_height':
                if(!form.max_height) error.max_height = 'Altura requerida'
                else if(!/^[1-9][0-9]$|^[1-9]$|^1[0-4][0-9]|150$/.test(form.max_height)){
                    error.max_height = 'Debe ser un numero entero entre 1 y 150.'
                } else if(parseInt(form.max_height) < parseInt(form.min_height)) error.max_height = 'Debe ser mayor a la altura minima.'
                else{
                    if(error.min_height === 'Debe ser menor a la altura maxima.') error.min_height = ''
                    error.max_height = ''
                }
                break;

            case 'min_height':
                if(!form.min_height) error.min_height = 'Altura requerida'
                else if(!/^[1-9][0-9]$|^[1-9]$|^1[0-4][0-9]|150$/.test(form.min_height)){
                    error.min_height = 'Debe ser un numero entero entre 1 y 150.'
                } else if(parseInt(form.min_height) > parseInt(form.max_height)) error.min_height = 'Debe ser menor a la altura maxima.'
                else{
                    if(error.max_height === 'Debe ser mayor a la altura minima.') error.max_height = ''
                    error.min_height = ''
                }
                break;
                
            case 'max_weight':
                if(!form.max_weight) error.max_weight = 'Peso requerido'
                else if(!/^[1-9][0-9]$|^[1-9]$|^100$/.test(form.max_weight)){
                    error.max_weight = 'Debe ser un numero entero entre 1 y 100.'
                } else if(parseInt(form.max_weight) < parseInt(form.min_weight)) error.max_weight = 'Debe ser mayor al peso minimo.'
                else{
                    if(error.min_weight === 'Debe ser menor al peso maximo.') error.min_weight = ''
                    error.max_weight = ''
                }
                break;
                
                case 'min_weight':
                    if(!form.min_weight) error.min_weight = 'Peso requerido'
                    else if(!/^[1-9][0-9]$|^[1-9]$|^100$/.test(form.min_weight)){
                        error.min_weight = 'Debe ser un numero entero entre 1 y 100.'
                } else if(parseInt(form.min_weight) > parseInt(form.max_weight)) error.min_weight = 'Debe ser menor al peso maximo.'
                else{
                    if(error.max_weight === 'Debe ser mayor al peso minimo.') error.max_weight = ''
                    error.min_weight = ''
                }
                break;
                
                case 'max_life_span':
                    if(!form.max_life_span) error.max_life_span = 'Edad requerida'
                else if(!/^[1-9]$|^1[0-9]$|^2[0-5]$/.test(form.max_life_span)){
                    error.max_life_span = 'Debe ser un numero entero entre 1 y 25.'
                } else if(parseInt(form.max_life_span) < parseInt(form.min_life_span)) error.max_life_span = 'Debe ser mayor a la edad minima.'
                else{
                    if(error.min_life_span === 'Debe ser menor a la edad maxima.') error.min_life_span = ''
                    error.max_life_span = ''
                }
                break;
                
                case 'min_life_span':
                if(!form.min_life_span) error.min_life_span = 'Edad requerida'
                else if(!/^[1-9]$|^1[0-9]$|^2[0-5]$/.test(form.min_life_span)){
                    error.min_life_span = 'Debe ser un numero entero entre 1 y 25.'
                } else if(parseInt(form.min_life_span) > parseInt(form.max_life_span)) error.min_life_span = 'Debe ser menor a la edad maxima.'
                else{
                    if(error.max_life_span === 'Debe ser mayor a la edad minima.') error.max_life_span = ''
                    error.min_life_span = ''
                }
                break;
            
            default:
                break;
            }
            
            return error
    }
    
    function handleSelectTemper(e){
        if(e.target.value !== 'Temperamentos'){
            setTempers(prev => [...prev, e.target.value])
        }
    }

    function handleChange(e) {
        const formulario = {
            ...form,
            [e.target.name] : e.target.value
        }

        setForm(formulario);
        setError(validate(formulario, e.target.name));
    }

    function handleSubmit(){
        const dog = {
            name: form.name,
            height: form.min_height !== form.max_height ? `${form.min_height} - ${form.max_height}` : `${form.min_height}`,
            weight: form.min_weight !== form.max_weight ? `${form.min_weight} - ${form.max_weight}` : `${form.min_weight}`,
            life_span: form.min_life_span !== form.max_life_span ? `${form.min_life_span} - ${form.max_life_span} years` : `${form.min_life_span} years`,
            temperament: tempers 
        }
        axios.post('http://localhost:3001/dogs', dog)
        history.push('/home')
    }
    
    return (
        <div id={s.body}>
            <form id={s.form} onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}noValidate>
                <img id={s.sign}src={sign} alt="" />
                <img id={s.dog2}src={dog2} alt="" />
                <img id={s.dog} src={dog} alt="" />
                <button id={s.btn} onClick={() => history.push('/home')}>🡰Volver</button>
                <div id={s.formContainer}>
                    <div className={s.formGroup}>
                        <input className={!errors.name ? s.input : s.errorInput} type="text" name="name" value={form.name} onChange={handleChange}  />
                        <label>Nombre </label>
                        {!errors.name ? null : <span>{errors.name}</span>}
                    </div>
                    <div className={s.formGroup}>
                        <input className={!errors.min_height ? s.input : s.errorInput} type="number" name='min_height' onChange={handleChange}/>
                        <label>Altura minima </label>
                        {!errors.min_height ? null : <span>{errors.min_height}</span>}
                    </div>
                    <div className={s.formGroup}>
                        <input className={!errors.max_height ? s.input : s.errorInput} type="number" name='max_height' onChange={handleChange} />
                        <label>Altura maxima </label>
                        {!errors.max_height ? null : <span>{errors.max_height}</span>}
                    </div>
                    <div className={s.formGroup}>
                        <input className={!errors.min_weight ? s.input : s.errorInput} type="number" name='min_weight' onChange={handleChange}/>
                        <label>Peso minimo </label>
                        {!errors.min_weight ? null : <span>{errors.min_weight}</span>}
                    </div>
                    <div className={s.formGroup}>
                        <input className={!errors.max_weight ? s.input : s.errorInput} type="number" name='max_weight' onChange={handleChange}/>
                        <label>Peso maximo </label>
                        {!errors.max_weight ? null : <span>{errors.max_weight}</span>}
                    </div>
                    <div className={s.formGroup}>
                        <input className={!errors.min_life_span ? s.input : s.errorInput} type="number" name='min_life_span' onChange={handleChange}/>
                        <label>Edad minima </label>
                        {!errors.min_life_span ? null : <span>{errors.min_life_span}</span>}
                    </div>
                    <div className={s.formGroup}>
                        <input className={!errors.max_life_span ? s.input : s.errorInput} type="number" name='max_life_span' onChange={handleChange}/>
                        <label>Edad maxima </label>
                        {!errors.max_life_span ? null : <span>{errors.max_life_span}</span>}
                    </div>
                </div>
                <input id={s.send} type="submit" disabled={disabledSend}/>
            </form>
            <div id={s.temperContainer}>
                    <SelectTemper disabled={disabledTemper} handleSelect={handleSelectTemper}/>
                    <div className={s.btnContainer}>
                        {tempers.map(temper => 
                            <button className={s.btnTemper} onClick={() => setTempers(tempers.filter(t => t !== temper))}>{temper}</button>
                            )}
                    </div>
                    {tempers.length === 0 ? <span id={s.temperError}>Un temperamento minimo requerido.</span> : null}
            </div>
        </div>
  )
}
