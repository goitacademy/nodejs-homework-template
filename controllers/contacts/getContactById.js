const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const ownerId = req.user._id;
  const result = await Contact.findById(contactId)
  if (!result || ownerId.toString() !== result.owner.toString()) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result });
}
module.exports = getContactById;