const express = require('express')
const path = require('path')
const routes = require('./server/routes')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', routes)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})
