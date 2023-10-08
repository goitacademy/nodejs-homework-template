const { Contact } = require("../../models/contact-model");

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById({ _id: req.params.contactId, owner: req.user.id});
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
