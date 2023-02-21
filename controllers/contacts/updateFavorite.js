const ContactsModel = require("../../models");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  console.log("contact id", contactId);

  const updateStatusContact = await ContactsModel.findByIdAndUpdate(
    contactId,
    { ...req.body },
    { new: true }
  );

  if (!updateStatusContact) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: updateStatusContact,
  });
};

module.exports = updateFavorite;
