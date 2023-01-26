const { Contacts } = require("../../models/contact.js");
const { RequestError } = require("../../helpers/index.js");

// GET / api / contacts /: id

async function getContact(req, res, next) {
  try {
    const { id } = req.params;
    const contact = await Contacts.findById({ _id: id });

    if (!contact) {
      throw RequestError(404, "Not found");
    }
    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

module.exports = getContact;
