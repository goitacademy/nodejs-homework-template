const { Contact } = require("../../models/Contact");

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
