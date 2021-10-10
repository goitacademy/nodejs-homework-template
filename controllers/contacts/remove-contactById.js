const { sendSuccessRes } = require('../../helpers');
const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessRes(res, { message: 'Success delete' });
};

module.exports = removeContact;
