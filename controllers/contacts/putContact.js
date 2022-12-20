const { updateContact } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const putContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name || email || phone) {
    const obj = await updateContact(req.params.contactId, req.body);
    if (obj) {
      res.status(200).json({ obj });
    } else {
      throw NotFound(`Contact with id=${req.params.contactId} not found`);
    }
  }
};

module.exports = putContact;
