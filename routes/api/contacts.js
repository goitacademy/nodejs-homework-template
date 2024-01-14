const express = require('express')

const router = express.Router()

const getRouters = require('./get.routers')
const putRouters = require('./put.routers')
const patchRouters = require('./patch.routers')
const postRouters = require('./post.routers')
const deleteRouters = require('./delete.routers')

router.use('/', getRouters , putRouters, patchRouters, postRouters, deleteRouters)

module.exports = router
