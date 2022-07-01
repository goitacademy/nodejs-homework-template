const validation = require('./validationMiddleware')
const auth = require('./auth')
const upload = require('./upload')

module.exports = { auth, validation, upload }
