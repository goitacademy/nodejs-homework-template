const contacts = require("../../models/contacts");
// const { requestError } = require("../../helpers/");
// const schema = require("../../shemas/contactShema");

const addContact = async (req, res, next) => {
  //   const { error } = schema.add.validate(req.body);
  //   if (error) {
  //     throw requestError(400, error.message);
  //   }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
