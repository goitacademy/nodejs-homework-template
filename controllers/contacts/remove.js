const contactsBook = require("../../models/contacts.js");
const errorMessage = require("../../helpers/errorMessage.js");

const remove = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const result = await contactsBook.findByIdAndRemove(id);
    if (result === null) {
      throw errorMessage(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
