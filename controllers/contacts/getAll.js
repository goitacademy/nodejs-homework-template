const asyncHandler = require('express-async-handler')

const operations = require('../../service/contacts')

const getAll = asyncHandler(async (req, res, next) => {
  const contacts = await operations.listContacts()

  res.json({
    status: 'success',
    code: 200,
    data: { contacts },
  })
})

module.exports = getAll
