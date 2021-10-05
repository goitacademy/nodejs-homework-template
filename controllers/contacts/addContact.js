const { Contact } = require("../../models");
const { sendSuccessResponse } = require("../../utils");

const addContact = async (req, res) => {
  console.log(req.body); //считать тело запроса
  const contact = await Contact.create({ ...req.body, owner: _id });
  sendSuccessResponse(res, { contact }, 201);
};

module.exports = addContact;
