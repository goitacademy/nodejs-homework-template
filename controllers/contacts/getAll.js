// const createError = require("http-errors")
const { InternalServerError } = require('http-errors')

const contacstOperations = require('../../model/contacts')

const getAll = async (req, res, next) => {
  const contactsData = await contacstOperations.listContacts()

  if (!contactsData) throw new InternalServerError("Can't read data from file")

  res.status(200).json({
    status: 'Contacts received',
    code: 200,
    data: {
      contactsData
    }
  })
}

module.exports = {
  getAll
}
