const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
});

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const tasa = await axios
			.get('http://www.bcv.org.ve/', { httpsAgent })
			.then((res) => {
				const $ = cheerio.load(res.data);
				const string = $('div#dolar').text();
				let limpio = string.replace(/\s+/g, '');
				limpio = limpio.replace('USD', '');
				limpio = limpio.replace(',', '.');
				limpio = Number(limpio);
				return limpio;
			})
			.catch((err) => console.error(err));

		res.status(201).json({ tasa });
	} else {
		res.status(401).end();
	}
}
