const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const result = await Contact.addContact(req.body);
  sendSuccessRes(res, { result }, 201);
};

module.exports = add;
