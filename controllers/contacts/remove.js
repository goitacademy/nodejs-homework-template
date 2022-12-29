const { removeContact } = require("../../models/contacts");

const remove = async (req, res, next) => {
  try {
    const requestId = req.params.contactId;
    const contact = await removeContact(requestId);

    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "contact deleted", data: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
