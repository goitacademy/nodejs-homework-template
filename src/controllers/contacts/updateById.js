const { Contact } = require("../../models/contacts");
// const createError = require("http-errors");
const {requestError} = require("../../helpers/requestError");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw requestError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: { data: result },
  });
};

module.exports = updateById;