const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const updateContact = async (req, res) => {
  const ownerId = req.user._id;
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId)

  if (!contact || ownerId.toString() !== contact.owner.toString()) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  sendSuccessRes(res, result, 200, 'Contact has been successfully updated');
}

module.exports = updateContact
