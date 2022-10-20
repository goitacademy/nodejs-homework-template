const { Contact } = require("../../service/schemasContacts");
const RequestError = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const result = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, `Not found contact id: ${contactId}`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact: result },
  });
};

module.exports = updateStatusContact;
