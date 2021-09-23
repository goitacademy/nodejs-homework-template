const contactsOperations = require("../../model/contacts");
const { sendSuccessResponse } = require("../../utils");

const addContact = async (req, res) => {
  console.log(req.body); //считать тело запроса
  const contact = await contactsOperations.addContact(req.body);
  sendSuccessResponse(res, { contact }, 201);
};

module.exports = addContact;
