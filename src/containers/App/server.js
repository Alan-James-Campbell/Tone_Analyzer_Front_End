// const express = require('express')
// const bodyParser = require('body-parser')
// const path = require('path')
// const app = express()
// app.use(express.static(path.join(__dirname, 'build')))

// //API Route To Access Watson Tone Analyzer

// app.get('/api/analyzeEntry', (req,res, next) => {
//   console.log('req', req)
//   res.send({data: 'tacos!'})
// })




// app.get('/ping', function (req, res) {
// 	alert('hey')
//  return res.send('pong')
// });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// });


// app.listen(process.env.PORT || 8080)



//   const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
// const { IamAuthenticator } = require('ibm-watson/auth');

// const toneAnalyzer = new ToneAnalyzerV3({
//   version: '2017-09-21',
//   authenticator: new IamAuthenticator({
//     apikey:'s8NneGprypcjshsq9xFNEECgB-NT_0F_4l-R34bN1qHR',
//   }),
//   url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
// });

// const text = 'Team, I know that times are tough! Product '
//   + 'sales have been disappointing for the past three '
//   + 'quarters. We have a competitive product, but we '
//   + 'need to do a better job of selling it!';

// const toneParams = {
//   toneInput: { 'text': text },
//   contentType: 'application/json',
// };

// toneAnalyzer.tone(toneParams)
//   .then(toneAnalysis => {
//     console.log(JSON.stringify(toneAnalysis, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });