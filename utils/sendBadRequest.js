const { isEmpty } = require('./isEmpty')

const sendBadRequest = ({ body }, res, error) => {
  const err = isEmpty(body) ? 'missing fields: ' : ''

  res.status(400).json({
    status: 'error',
    code: 400,
    message: err + error.message,
  })
}

module.exports = { sendBadRequest }
