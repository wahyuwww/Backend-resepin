const express = require('express')
const Router = express.Router()

const foodRouter = require('./food')
const auth = require('./auth')
const active = require('./activasi')
Router.use('/food', foodRouter)
  .use('/auth', auth)
  .use('https://resepin-aja.vercel.app/', active)
module.exports = Router
