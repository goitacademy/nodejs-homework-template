const { Contact } = require("../models/contact");

const validateContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById({ _id: id });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  next();
};

module.exports = validateContact;
