const contacts = require("../../models/contacts");
const HttpError = require("../../helpers");

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "Delete Success" });
  } catch (error) {
    next(error);
  }
};
module.exports = remove;
