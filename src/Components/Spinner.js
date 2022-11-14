import React from 'react'
import loading from './loading.gif'

function Spinner() {
  return (
    <div >
        <center>
        <img  src={loading} alt='loading'></img>
        </center>
    </div>
  )
}

export default Spinner