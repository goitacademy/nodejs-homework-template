const Contacts = require("../model");

const getByIdContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await Contacts.getContactById(contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }
    return res.json({ contact });
  } catch (error) {
    next(error);
  }
};
module.exports = getByIdContact;
