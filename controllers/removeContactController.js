const { removeContact } = require("../services");

const removeContactController = async (req, res) => {
  const { contactId: id } = req.params;
  const contactRemove = await removeContact(id);
  if (!contactRemove) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  return res.status(200).json({
    message: "Contact deleted",
  });
};

module.exports = removeContactController;
