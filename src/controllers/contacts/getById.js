const { Contact } = require("../../models/contacts");
const {requestError} = require("../../helpers/requestError");
// const createError = require('http-errors');

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const contact = await Contact.findOne({_id: contactId});
  const result = await Contact.findById(contactId);

  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result: result },
  });
};

module.exports = getById;