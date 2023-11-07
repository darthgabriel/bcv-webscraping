import React, { useEffect, useState } from 'react'

const Bcvlogo = () => {
  const [dataTime, setDataTime] = useState({
    dia: 0,
    mes: 0,
    year: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date()
      setDataTime({
        dia: date.getDate(),
        mes: date.getMonth() + 1,
        year: date.getFullYear(),
        horas: date.getHours(),
        minutos: date.getMinutes(),
        segundos: date.getSeconds()
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className='logoBcv'>
      <img className='imagenBcv' src='\logo_BCV.png' />
      <div className='fechaCon'>
        <h1 className='fecha'>
          {`${dataTime.dia}/${dataTime.mes}/${dataTime.year} `}
          {dataTime.horas < 10 ? ` 0${dataTime.horas}` : dataTime.horas} : {dataTime.minutos < 10 ? ` 0${dataTime.minutos}` : dataTime.minutos} : {dataTime.segundos < 10 ? ` 0${dataTime.segundos}` : dataTime.segundos}
        </h1>
      </div>
    </div>
  )
}

export default Bcvlogo
