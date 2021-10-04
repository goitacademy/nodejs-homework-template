const { sendSuccessRes } = require("../../helpers");
const contactsOperations = require("../../model/contacts");

const post = async (req, res, next) => {
  const result = await contactsOperations.addContact(req.body);
  sendSuccessRes(res, { result }, 201);
};

module.exports = post;
