const { contactRepository } = require("../../repository");
const { HttpCode } = require("../../utils");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await contactRepository.removeContact(userId, id);
  if (!contact) {
    return res.status(HttpCode.OK).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: `contact with id:'${id}' - not found`,
    });
  }
  res.status(HttpCode.NOT_FOUND).json({
      status: "success",
      code: HttpCode.OK,
      message: `contact with id:'${id}' deleted`,
  });
};
module.exports = removeContact;
