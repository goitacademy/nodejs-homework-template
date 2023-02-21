const ContactsModel = require("../../models");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await ContactsModel.findByIdAndUpdate(
    contactId,
    { ...req.body },
    { new: true }
  );

  if (!updatedContact) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

module.exports = updateContact;
