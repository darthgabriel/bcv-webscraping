import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'

import Header from '../components/Header'
import Bcvlogo from '../components/Bcvlogo'
import Tasa from '../components/Tasa'

export default function Home () {
  const getTasaBcv = () => {
    axios
      .post('/api')
      .then((r) => setTasa(r.data.tasa))
      .catch((e) => 'SIN CONEXION')
  }

  const [tasa, setTasa] = useState(getTasaBcv())

  useEffect(() => {
    setInterval(() => {
      getTasaBcv()
    }, 3600000)
  }, [])

  return (
    <>
      <Head>
        <title>Dai Motors, S.A. - Tasa al Dia</title>
        <meta name='description' content='BCV Tasa al dia - Dai Motors, S.A.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className='container'>
          <Header />
          <div id='row' className='content'>
            <Bcvlogo />
            <Tasa tasa={tasa} />
          </div>
        </div>
      </main>
    </>
  )
}
