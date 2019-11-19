'use strict'

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3')
const { IamAuthenticator } = require('ibm-watson/auth')

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({apikey:'s8NneGprypcjshsq9xFNEECgB-NT_0F_4l-R34bN1qHR'}), 
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
})

module.exports = require('express').Router()
  .post('/analyzeEntry', (req,res, next) => { // An api endpoint that accesses Watson's Tone Analyzer
    const { text } = req.body
    const toneParams = {toneInput: { text }, contentType: 'application/json'}
    toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => res.send(toneAnalysis))
    .catch(err => console.log('error:', err))
  })