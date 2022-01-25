const getAll = require('./getAll')
const getContactById = require('./getContactById')
const createContact = require('./createContact')
const updateContactById = require('./updateContactById')
const updateStatusContact = require('./updateStatusContact')
const deleteContactById = require('./deleteContactById')

const ctrl = {
  getAll,
  getContactById,
  createContact,
  updateContactById,
  updateStatusContact,
  deleteContactById,
}
module.exports = ctrl
