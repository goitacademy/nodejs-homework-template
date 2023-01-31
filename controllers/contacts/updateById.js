const { Contact } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

module.exports = removeById;
