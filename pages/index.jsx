import { useState, useEffect, useRef } from 'react';
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
		
		<>
			<Head>
				<title>BCV - Webscraping</title>
				<meta name='description' content='BCV WebScraping' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<Image width={200} height={200} objectFit='cover' src={'/bcvlogo.png'} alt='' />
				<h1>$ USD <br /> {tasa}</h1>
				 {tasa > 0 && <Conversor tasa={tasa} />}
				<h4>{fecha}</h4>
			</main>

			<footer>
				Powered by Ing. Jose Paredes
			</footer>
		</>
	);
}

const Conversor = ({tasa}) => {

	const total = useRef();

	const cambio = (e) => {
		const monto = Number(e.target.value)
		const conversion = monto * tasa;
		total.current.value = conversion;
	}

	return (
		<div className='conversor'>
			<label htmlFor="monto">$</label>
			<input type="number" name="monto" autoFocus onKeyUp={cambio} autoComplete={'off'} onClick={(e) => e.target.value = ""}/>
			<label htmlFor="total">Bs</label>
			<input type="number" name="total" readOnly ref={total}/>
		</div>
	)
}
