const { RequestError } = require("../../helpers");
const { removeContact } = require("../../services");

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const { deletedCount } = await removeContact(contactId, owner);

  if (!deletedCount) {
    throw RequestError(404, "Contact with this ID not found");
  }

  return res.status(200).json({ status: "success", message: "Contact successfully deleted" });
};

module.exports = removeContactController;
