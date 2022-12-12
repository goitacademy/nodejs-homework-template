const Contact = require("../../models/contact");

const { httpError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove({ _id: contactId });
  if (!result) {
    throw httpError(404);
  }
  res.json(result);
};

module.exports = removeById;
