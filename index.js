const express         = require('express')
const path            = require('path')
const axios           = require('axios')
const bodyParser      = require('body-parser')

const app = express()

app
  .use(express.static(path.join(__dirname, '/public'))) // Serve the static files from the React app
  .use(bodyParser.urlencoded({ extended: true }))               // Allows req.body
  .use(bodyParser.json())                                       // Parsing Middleware
  .use('/api', require('./expressAPI/index'))                   // Used for external APIs unrelated to AWS Serverless Architecture
  .get('*', (req,res) => res.sendFile(path.join(__dirname+'/public/index.html')))  // Handles unknown requests

  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server`)
      const { address, port } = server.address()
      const host = address === '::' ? 'localhost' : address
      const urlSafeHost = host.includes(':') ? `[${host}]` : host
      console.log(`Listening on http://${urlSafeHost}:${port}`)
    }
  )
