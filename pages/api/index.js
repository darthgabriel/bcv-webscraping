import moment from 'moment-timezone'
import { kv } from '@vercel/kv'
const axios = require('axios')
const cheerio = require('cheerio')
const https = require('https')

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

// configurar moment a venezuela
moment.tz.setDefault('America/Caracas')

export default async function handler (req, res) {
  if (req.method === 'GET') return getTasaOffline(req, res)
  if (req.method === 'POST') return getTasaOffline(req, res)

  return res.status(401).end()
}

const getTasaOffline = async (req, res) => {
  const { user } = req.query

  if (!user) {
    return res.status(400).send({ error: 'Usuario no definido, API protegida' })
  }

  const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss')
  console.log(`Usuario solicitando: ${user} a las ${fechaActual}`)

  try {
    const fechaGuardada = await kv.get('fecha')
    console.log('Fecha guardada en kv:', fechaGuardada)

    if (!fechaGuardada || moment(fechaGuardada).isBefore(fechaActual)) {
      console.log('Actualizando tasa online')
      const tasa = await obtenerTasaOnline()
      if (tasa !== null) {
        await actualizarTasaOffline(tasa)
      }
    }

    console.log('Obteniendo tasa de kv')
    const tasa = await kv.get('tasa')
    console.log(`${user} obtuvo tasa ${tasa} de la fecha: ${fechaGuardada || fechaActual}`)

    return res.status(201).json({ tasa: tasa || 0.00, fechaGuardada, fechaActual })
  } catch (error) {
    console.error('Error al obtener tasa:', error)
    return res.status(500).json({ error: 'Error al obtener tasa' })
  }
}

const actualizarTasaOffline = async (nuevaTasa) => {
  try {
    await kv.set('tasa', Number(nuevaTasa))
    await kv.set('fecha', moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'))
  } catch (error) {
    console.error('Error al actualizar tasa offline:', error)
  }
}

const obtenerTasaOnline = async () => {
  try {
    const response = await axios.get('https://www.bcv.org.ve/', { httpsAgent })
    const $ = cheerio.load(response.data)
    let tasa = $('div#dolar').text().replace(/\s+/g, '').replace('USD', '').replace(',', '.')
    tasa = Number(tasa)
    console.log('Tasa obtenida del BCV:', tasa)
    return tasa
  } catch (error) {
    console.error('Error al obtener tasa online:', error)
    return null
  }
}
