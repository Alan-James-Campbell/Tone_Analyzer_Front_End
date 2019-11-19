const express         = require('express')
const path            = require('path')
const axios           = require('axios')
const bodyParser      = require('body-parser')

const app = express()

app
  .use('/api', require('./expressAPI/index'))                   // Used for external APIs unrelated to AWS Serverless Architecture
  .use(express.static(path.join(__dirname, 'build'))) // Serve the static files from the React app
  .get('*', (req,res) => res.sendFile(path.join(__dirname+'build', 'index.html')))  // Handles unknown requests
  .use(bodyParser.urlencoded({ extended: true }))               // Allows req.body
  .use(bodyParser.json())                                       // Parsing Middleware

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
