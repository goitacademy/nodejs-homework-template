const { updateContact } = require("../../models/contacts");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "missing fields");
  }
  const result = await updateContact(id, req.body);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  console.log(result);
  res.status(200).json(result);
};

module.exports = updateById;
