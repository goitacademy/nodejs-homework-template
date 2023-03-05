const mongoose = require("mongoose");
const { getContactById } = require("../services");

const getContactByIdCtrl = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  const contact = await getContactById(contactId);

  return contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
};

module.exports = getContactByIdCtrl;
