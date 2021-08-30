const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contacts = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!contacts) return res.status(404).json({ message: "Not found" });

    res.json({ contacts });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
