const express = require('express')
const router = express.Router()

const avatar = require('./avatar.js')

router.use('/avatar', avatar)

module.exports = router
