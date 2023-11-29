const express = require('express')
const router = express.Router()

const avatar = require('./avatar.js')

router.use('/', avatar)

module.exports = router
