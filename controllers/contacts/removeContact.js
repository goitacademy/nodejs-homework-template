const { Contact } = require("../../models/contact");
const { requestError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw requestError(404, "Not found");
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
