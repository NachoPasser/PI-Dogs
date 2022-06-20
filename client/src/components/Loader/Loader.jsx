import React from 'react'
import gif from '../../images/gif.gif'

export default function Loader({imgStyle, textStyle}) {
  return (
    <div>
        <img id={imgStyle} src={gif} alt="" />
        <span id={textStyle}>Loading...</span>
    </div>
  )
}
