const repositoryContacts = require("../../repository");
const { HttpCode } = require("../../utils");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.removeContact(id);
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: `contact with id:'${id}' deleted`,
    });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: `contact with id:'${id}' - not found`,
  });
};
module.exports = removeContact;
