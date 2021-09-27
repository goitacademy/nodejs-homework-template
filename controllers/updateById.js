const { NotFound } = require("http-errors");
const { updateContact } = require("../model/contacts");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw new NotFound("Not found");
  }
  res.status(201).json({ status: "success", code: 201, data: { result } });
};

module.exports = updateById;