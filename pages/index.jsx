import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/es'

import Conversor from '../components/Conversor'

const getTasaBcv = async () => {
  const tasa = await axios
    .post('/api?user=bcv-webscraping')
    .then((r) => r.data.tasa)
    .catch((e) => 'SIN CONEXION')

  return tasa
}
export default function Home () {
  const [tasa, setTasa] = useState(0.00)
  const [fecha, setFecha] = useState(moment().format('dddd DD [de] MMMM [del] YYYY h:mm a'))

  useEffect(() => {
    getTasaBcv()
      .then((r) => {
        setTasa(r)
      })
    setFecha(moment().format('dddd DD [de] MMMM [del] YYYY h:mm a'))
  }, [])

  return (

    <>
      <Head>
        <title>BCV - Webscraping</title>
        <meta name='description' content='BCV WebScraping' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Image width={200} height={200} objectFit='cover' src='/bcvlogo.png' alt='' />
        <h1>$ USD <br /> {tasa}</h1>
        {tasa > 0 && <Conversor tasa={tasa} />}
        <h4>{fecha}</h4>
      </main>

      <footer>
        Powered by Ing. Jose Paredes
      </footer>
    </>
  )
}
