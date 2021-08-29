import express from 'express'
import { mock } from './mock'
import { APISettings, APITypes } from './setup'

const port = Number.parseInt(process.argv[2])
const app = express()

app.use(express.json())

app.post('/mock', (req, res) => {
  console.log(req.body)
  res.send(mock(APITypes,APISettings))
})

app.listen(port, () => {
  console.log(`Mock server started at http://localhost:${port}`);
})