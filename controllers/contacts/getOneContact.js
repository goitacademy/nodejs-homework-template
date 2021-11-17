const getContactById = require("../../model/contacts/getContactById");

const getOneContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    contact
      ? res.status(200).json({ contact, status: "success" })
      : res.status(404).json({ message: "Contact not found" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = getOneContact;
