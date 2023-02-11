const { Contacts } = require("../../models/contact.js");
const { RequestError } = require("../../helpers/index.js");

// DELETE /api/contacts/:id

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    const contactId = await Contacts.findById({ _id: id });
    if (!contactId) {
      throw RequestError(404, "Not found");
    }
    await Contacts.findOneAndRemove({ _id: id });
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = deleteContact;
