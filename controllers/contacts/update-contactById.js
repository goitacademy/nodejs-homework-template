const { sendSuccessRes } = require('../../helpers');
const contactsOperations = require('../../model/contacts');
const { NotFound } = require('http-errors');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessRes(res, { result });
};

module.exports = updateContact;
