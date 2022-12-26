import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/es';

export default function Home() {

  const getTasaBcv = () => {
    axios
      .post('/api')
      .then((r) => setTasa(r.data.tasa))
      .catch((e) => 'SIN CONEXION');
  };

  
	const [tasa, setTasa] = useState(getTasaBcv());
	const [fecha, setFecha] = useState(moment().format('dddd DD [de] MMMM [del] YYYY h:mm a'));

	useEffect(() => {
		setInterval(() => {
			getTasaBcv();
			setFecha(moment().format('dddd DD [de] MMMM [del] YYYY h:mm a'));
		}, 3600000);
	}, []);

	return (
		<div>
			<Head>
				<title>BCV - Webscraping</title>
				<meta name='description' content='BCV WebScraping' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<Image width={300} height={300} objectFit='cover' src={'/bcvlogo.png'} alt='' />
				<h1>$ USD {tasa}</h1>
				<h4>{fecha}</h4>
			</main>

			<footer>
				Powered by Ing. Jose Paredes
			</footer>
		</div>
	);
}
