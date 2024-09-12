const { getContactById } = require("../../services");

const getContactByIdCtrl = async (req, res) => {
  const { id: owner } = req.user;
  const { contactId: id } = req.params;

  const contact = await getContactById(id, owner);

  if (!contact) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  res.status(200).json(contact);
};

module.exports = getContactByIdCtrl;