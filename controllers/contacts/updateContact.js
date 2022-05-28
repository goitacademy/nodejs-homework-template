const { contactRepository } = require("../../repository");
const { HttpCode } = require("../../utils");

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await contactRepository.updateContact(userId, id, req.body);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: `contact with id:'${id}' - not found`,
  });
};

module.exports = updateContact;
