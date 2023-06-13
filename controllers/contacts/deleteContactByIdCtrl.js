const { removeContact } = require("../../services");

const deleteContactByIdCtrl = async (req, res) => {
  const { contactId: id } = req.params;
  const { id: owner } = req.user;

  const contactRemove = await removeContact(id, owner);
  if (!contactRemove) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  return res.status(200).json({
    message: "Contact deleted",
  });
};

module.exports = deleteContactByIdCtrl;