const express = require('express')
const router = express.Router()
const {downloadController} = require('../controllers/avatarsController')
const { asyncWrapper } = require('../helpers/apiHelpers')

router.use('/download/:filename', asyncWrapper(downloadController) )

module.exports = { avatarsRouter: router } 