const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId, "_id name email phone favorite")
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result });
}
module.exports = getContactById;
