require('dotenv').config()
const express = require('express')
const path = require('path')
const routes = require('./server/routes/avatar')
const cors = require('cors')
const PORT = process.env.SERVER_PORT || 4000
const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})
