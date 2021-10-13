const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const removeContact = async (req, res) => {
  const ownerId = req.user._id;
  const { contactId } = req.params;
  
  const contact = await Contact.findById(contactId)

  if (!contact || ownerId.toString() !== contact.owner.toString()) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
    const result = await Contact.findByIdAndDelete(contactId)
  sendSuccessRes(res, result, 200, 'Contact has been successfully deleted');
}

module.exports = removeContact
