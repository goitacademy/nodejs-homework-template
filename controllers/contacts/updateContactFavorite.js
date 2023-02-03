const Contact = require("../../models/contactsModel");

const updateContactFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;
  if (body.favorite.length) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }
  try {
    await Contact.updateOne({ _id: contactId }, { favorite: body.favorite });
    res.status(200).json({ status: "success", code: 200, data: body });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      code: 404,
      data: { message: "Not found" },
    });
  }
};

module.exports = updateContactFavorite;
