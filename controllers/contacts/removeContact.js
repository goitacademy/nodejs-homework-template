const { NotFound } = require('http-errors')
const { Contact } = require('../../models');
const { sendSuccessRes } = require('../../helpers')

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessRes(res, result, 200, 'Contact has been successfully deleted');
}

module.exports = removeContact
