const repositoryContacts = require("../../repository");
const { HttpCode } = require("../../utils");

const postContact = async (req, res, next) => {
  const newContact = await repositoryContacts.addContact(req.body);
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { newContact } });
};
module.exports = postContact;
