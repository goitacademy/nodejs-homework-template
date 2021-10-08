const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models/contact/contact");

const post = async (req, res) => {
  const result = await Contact.addContact(req.body);
  sendSuccessRes(res, { result }, 201);
};

module.exports = post;
