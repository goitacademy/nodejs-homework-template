const { getById } = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  const ownerId  = req.user.id;
  const { contactId } = req.params;
  const data = await getById(contactId, ownerId);
  if (!data) {
    return res.status(400).json({ status: 400, message: "Not found" });
  }
  res.status(200).json({ data, status: 200, message: "operation successful" });
};

module.exports = getContactById;
