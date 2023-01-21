const Contact = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateById;
