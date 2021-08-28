const Contacts = require("../repositories/contacts");

const getByIdContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contacts.getContactById(contactId);

    if (!result) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};
module.exports = getByIdContact;
