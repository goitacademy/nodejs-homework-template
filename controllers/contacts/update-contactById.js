const { sendSuccessRes } = require('../../helpers');
const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessRes(res, { result });
};

module.exports = updateContact;
