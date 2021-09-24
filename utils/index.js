const { sendSuccess } = require('./sendSuccess')
const { sendNotFound } = require('./sendNotFound')
const { sendBadRequest } = require('./sendBadRequest')
const { isEmpty } = require('./isEmpty')

module.exports = { sendSuccess, sendNotFound, sendBadRequest, isEmpty }
