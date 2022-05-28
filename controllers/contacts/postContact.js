const { contactRepository } = require("../../repository");
const { HttpCode } = require("../../utils");

const postContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const newContact = await contactRepository.addContact(userId, req.body);
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { newContact } });
};
module.exports = postContact;
