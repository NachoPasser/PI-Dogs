import React, { useEffect, useState } from 'react';
export default function Form() {
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
        //TO DO if props of form is not '' then setDisabled to false
    }, [form])
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
                    error.max_height = 'Debe ser un numero entre 1 y 150.'
                } else if(form.max_height < form.min_height) error.max_height = 'Debe ser mayor a la altura minima.'
                else{
                    if(error.min_height === 'Debe ser menor a la altura maxima.') error.min_height = ''
                    error.max_height = ''
                }
                break;

            case 'min_height':
                if(!form.min_height) error.min_height = 'Altura requerida'
                else if(!/^[1-9][0-9]$|^[1-9]$|^1[0-4][0-9]|150$/.test(form.min_height)){
                    error.min_height = 'Debe ser un numero entre 1 y 150.'
                } else if(form.min_height > form.max_height) error.min_height = 'Debe ser menor a la altura maxima.'
                else{
                    if(error.max_height === 'Debe ser mayor a la altura minima.') error.max_height = ''
                    error.min_height = ''
                }
                break;

            case 'max_weight':
                if(!form.max_weight) error.max_weight = 'Peso requerido'
                else if(!/^[1-9][0-9]$|^[1-9]$|^100$/.test(form.max_weight)){
                    error.max_weight = 'Debe ser un numero entre 1 y 100.'
                } else if(form.max_weight < form.min_weight) error.max_weight = 'Debe ser mayor al peso minimo.'
                else{
                    if(error.min_weight === 'Debe ser menor al peso maximo.') error.min_weight = ''
                    error.max_weight = ''
                }
                break;

            case 'min_weight':
                if(!form.min_weight) error.min_weight = 'Peso requerido'
                else if(!/^[1-9][0-9]$|^[1-9]$|^100$/.test(form.min_weight)){
                    error.min_weight = 'Debe ser un numero entre 1 y 100.'
                } else if(form.min_weight > form.max_weight) error.min_weight = 'Debe ser menor al peso maximo.'
                else{
                    if(error.max_weight === 'Debe ser mayor al peso minimo.') error.max_weight = ''
                    error.min_weight = ''
                }
                break;

            case 'max_life_span':
                if(!form.max_life_span) error.max_life_span = 'Edad requerida'
                else if(!/^[1-9]$|^1[0-9]$|^2[0-5]$/.test(form.max_life_span)){
                    error.max_life_span = 'Debe ser un numero entre 1 y 25.'
                } else if(form.max_life_span < form.min_life_span) error.max_life_span = 'Debe ser mayor a la edad minima.'
                else{
                    if(error.min_life_span === 'Debe ser menor a la edad maxima.') error.min_life_span = ''
                    error.max_life_span = ''
                }
                break;

            case 'min_life_span':
                if(!form.min_life_span) error.min_life_span = 'Edad requerida'
                else if(!/^[1-9]$|^1[0-9]$|^2[0-5]$/.test(form.min_life_span)){
                    error.min_life_span = 'Debe ser un numero entre 1 y 25.'
                } else if(form.min_life_span > form.max_life_span) error.min_life_span = 'Debe ser menor a la edad maxima.'
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

    function handleChange(e) {
        const formulario = {
            ...form,
            [e.target.name] : e.target.value
        }

        setForm(formulario);
        setError(validate(formulario, e.target.name));
    }

    function handleSubmit(){
        if(form.name)
        console.log(form)
    }

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
    }} noValidate>
      <label>Nombre: </label>
      <input type="text" name="name" value={form.name} onChange={handleChange}  />
      {!errors.name ? null : <span>{errors.name}</span>}
      <br />
      <label>Altura minima: </label>
      <input type="number" name='min_height' onChange={handleChange}/>
      {!errors.min_height ? null : <span>{errors.min_height}</span>}
      <br />
      <label>Altura maxima: </label>
      <input type="number" name='max_height' onChange={handleChange} />
      {!errors.max_height ? null : <span>{errors.max_height}</span>}
      <br />
      <label>Peso minimo: </label>
      <input type="number" name='min_weight' onChange={handleChange}/>
      {!errors.min_weight ? null : <span>{errors.min_weight}</span>}
      <br />
      <label>Peso maximo: </label>
      <input type="number" name='max_weight' onChange={handleChange}/>
      {!errors.max_weight ? null : <span>{errors.max_weight}</span>}
      <br />
      <label>Edad minima: </label>
      <input type="number" name='min_life_span' onChange={handleChange}/>
      {!errors.min_life_span ? null : <span>{errors.min_life_span}</span>}
      <br />
      <label>Edad maxima: </label>
      <input type="number" name='max_life_span' onChange={handleChange}/>
      {!errors.max_life_span ? null : <span>{errors.max_life_span}</span>}
      <br />
      
      <input type="submit"/>
    </form>
  )
  //agregar disabled al input y que funcione en base a un estado
}
