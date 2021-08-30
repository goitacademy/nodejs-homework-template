const { Contact } = require("../../models");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (typeof favorite === "undefined") return res.status(400).json({ message: "missing field favorite" });

    const contacts = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    if (!contacts) return res.status(404).json({ message: "Not found" });

    res.json({
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
