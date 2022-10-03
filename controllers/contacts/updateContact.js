const { serviceContacts } = require("../../service");

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  const result = await serviceContacts.updateContact(contactId, body);
  if (!result) {
    res.status(404).json({
      status: "error",
      message: `Not found contact id: ${contactId}`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact: result },
  });
};
module.exports = changeContact;
