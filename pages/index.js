import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Image from 'next/image'

export default function Home() {

  const [tasa, setTasa] = useState(0.00)

  const getTasaBcv = async () => {
    await axios.post('/api')
    .then(res => {
      console.info(res.data.tasa)
      setTasa(res.data.tasa)
    })
    .catch(err => console.error(err))
  }

  useEffect(() => {
   getTasaBcv();
  }, [])
  
  return (
    <div>
      <Head>
        <title>BCV - Webscraping</title>
        <meta name="description" content="BCV WebScraping" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Image
          width={100}
          height={100}
          objectFit="cover"
          src={'/bcvlogo.png'}
          alt=""
        />
        <h1>
            {tasa}
        </h1>
      </main>

      <footer>
          Powered by{' '} 
          <span> Ing. Jose Paredes</span>
       
      </footer>
    </div>
  )
}
