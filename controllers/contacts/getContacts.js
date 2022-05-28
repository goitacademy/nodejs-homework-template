const { contactRepository } = require("../../repository");
const { HttpCode } = require("../../utils");

const getContacts = async (req, res, next) => {
  const { id: userId } = req.user;
  const contacts = await contactRepository.getAllContacts(userId, req.query);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
};

module.exports = getContacts;
