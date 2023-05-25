const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({ _id: contactId });
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
