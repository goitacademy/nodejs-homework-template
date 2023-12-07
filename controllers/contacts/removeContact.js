const { Contact } = require("../../models/contact");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
      const error = new Error("Not found contact");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;