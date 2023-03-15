import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/es';

import Header from '../components/Header';
import Bcvlogo from '../components/Bcvlogo';
import Tasa from '../components/Tasa';


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
	);
}
