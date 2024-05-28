const express = require('express')
const tasks = require('./src/routes/tasks')
const errorHandler = require('./src/middlewares/errorHandler')
const connectDB = require('./src/db/connect')
const notFound = require('./src/middlewares/not_found')
require('dotenv').config()
const app = express()

//socket props

const HOSTNAME = '127.0.0.1'
const PORT = 3000

//middlewares
app.use(express.json())
app.use(express.static('./public'))

//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)

//Global errors handler

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ msg: 'Internal Server Error.' })
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('DATABASE CONNECTED')
    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server Running On ${HOSTNAME}:${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
