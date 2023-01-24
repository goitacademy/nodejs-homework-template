const { updateContact } = require("../../models/contacts");

const changeContactById = async (req, res, next) => {
  const body = req.body;
  const  ownerId  = req.user.id;
  const { contactId } = req.params;
  const data = await updateContact(contactId, body, ownerId);
  if (!data) {
    return res.status(404).json({ status: 404, message: "Not found" });
  }
  res.status(200).json({ data, status: 200, message: "operation successful" });
};

module.exports = changeContactById;
