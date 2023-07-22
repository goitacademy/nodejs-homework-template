const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const getContactByID = async (req, res) => {
  const { contactId } = req.params;
  const user = await Contact.findById(contactId, "-createdAt, -updatedAt");

  if (!user) {
    throw HttpError(404, "User was not found!");
  }

  res.status(200).json(user);
};

module.exports = getContactByID;
