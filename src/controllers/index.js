const {addNewContact} = require('./addNewContactController/addNewContactController')
const {changeContactById} = require('./changeContactByIdContraller/changeContactByIdController')
const {changeStatusContact} = require('./changeStatusContactByIdController/changeStatusContactByIdController')
const {getAllContacts} = require('./getAllContactsController/getAllContactsController')
const {getOneContactById} = require('./getOneContactByIdController/getOneContactByIdController')
const {removeContactById} = require('./removeContactByIdController/removeContactByIdController')

module.exports = {
  addNewContact,
  changeContactById,
  changeStatusContact,
  getAllContacts,
  getOneContactById,
  removeContactById
}