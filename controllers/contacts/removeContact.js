const { ContactsModel } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removeResult = await ContactsModel.findByIdAndRemove(contactId);

  if (!removeResult) {
    res.status(404);
    throw new Error("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

module.exports = removeContact;
