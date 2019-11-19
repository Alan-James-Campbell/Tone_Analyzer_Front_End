'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/entries', require('./entries'))

api.use((req, res) => res.status(404).end())