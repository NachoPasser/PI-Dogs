import React from 'react'
import gif from '../../images/gif.gif'

export default function Loader({style}) {
  return (
    <div>
        <img id={style} src={gif} alt="" />
    </div>
  )
}
