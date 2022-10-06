const { Contact } = require("../../service/schemasContacts");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove({ _id: contactId });
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact: result },
  });
};
module.exports = deleteContact;
