const { removeContact } = require("../../models/contacts");

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await removeContact(contactId);

    if (!result) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;