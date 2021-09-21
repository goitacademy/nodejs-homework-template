const contactsOperations = require('../model')
const { sendSeccessRes } = require('../helpers')

const listContacts = async (_, res) => {
  const result = await contactsOperations.listContacts()

  sendSeccessRes(res, result)
}

module.exports = listContacts
