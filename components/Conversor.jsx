import { useRef } from 'react'

const Conversor = ({ tasa }) => {
  const totaldl = useRef()
  const totalbs = useRef()

  const cambiodlbs = (e) => {
    const monto = Number(e.target.value)
    const conversion = monto * tasa
    totalbs.current.value = conversion
  }

  const cambiobsdl = (e) => {
    const monto = Number(e.target.value)
    const conversion = monto / tasa
    totaldl.current.value = conversion
  }

  const clearInput = (e) => {
    e.target.value = ''
  }

  return (
    <div className='conversor'>
      <label htmlFor='monto'>$</label>
      <input type='number' name='monto' autoFocus ref={totaldl} onKeyUp={cambiodlbs} autoComplete='off' onClick={clearInput} />
      <label htmlFor='total'>Bs</label>
      <input type='number' name='total' ref={totalbs} onKeyUp={cambiobsdl} autoComplete='off' onClick={clearInput} />
    </div>
  )
}

export default Conversor
