const { updateContact } = require("../../models/contacts");

const changeContact = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const changedContact = await updateContact(contactId, body);
  if (!changedContact) {
    const err = new Error("Not found");
    err.status = 404;
    throw err;
  }

  res.json({ status: "success", data: changedContact });
};

module.exports = changeContact;
