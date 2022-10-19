const Contact = require("../../models/contact");
const RequestError = require("../../helpers/RequestError");

const updateStatusContact = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (result === null)
    throw RequestError(400, `There are no contacts with id: ${contactId}`);
  res.json(result);
};

module.exports = updateStatusContact;
