const RequestError = require("../../helpers/RequestError");
const Contact = require("../../models/contact");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (result === null)
    throw RequestError(404, `There are no contacts with id: ${contactId}`);

  res.json(result);
};

module.exports = removeById;
