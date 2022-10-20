const { Contact } = require("../../service/schemasContacts");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const RequestError = require("../../helpers");

  const result = await Contact.findByIdAndRemove({ _id: contactId });
  if (!result) {
     throw RequestError(404, `Not found contact id: ${contactId}`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact: result },
  });
};
module.exports = deleteContact;
