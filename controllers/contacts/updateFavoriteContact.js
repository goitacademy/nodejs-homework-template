const { Contact } = require("../../models");

const updateFavoriteContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contacts = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!contacts) {
    const error = new Error(`Not found ${contactId}`);
    error.status = 404;
    throw error;
  }
  res
    .status(200)
    .json({ status: "success", code: 200, data: { result: contacts } });
};

module.exports = updateFavoriteContact;
