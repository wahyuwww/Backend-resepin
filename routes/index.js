const express = require('express')
const Router = express.Router()

const foodRouter = require('./food')
const auth = require('./auth')
Router.use('/food', foodRouter)
  .use('/auth', auth)
module.exports = Router
