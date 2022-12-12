const contacts = require("../services/index");

const statusUpdate = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateStatusContact(contactId, req.body);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(result);
};

module.exports = statusUpdate;
