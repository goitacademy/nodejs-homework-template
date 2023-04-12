const { NotFound } = require("http-errors");
const contact = require("../../models/contact");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contact.findByIdAndRemove(contactId);
    if (!result) {
      throw new NotFound(`Not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
