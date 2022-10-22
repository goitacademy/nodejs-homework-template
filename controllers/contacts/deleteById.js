const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json({ message: "contact delited" });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteById;
