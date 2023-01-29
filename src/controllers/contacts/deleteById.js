// const {removeContact} = require('../../models/index');
const {Contact} = require("../../models/contacts");
const {requestError} = require("../../helpers/requestError");
// const createError = require('http-errors');

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Contact deleted successfully',
    data: { result },
  });
};


module.exports = deleteById;