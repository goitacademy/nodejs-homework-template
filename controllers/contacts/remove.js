const { removeContact } = require("../../model/index");
const { HttpCode } = require("../../helpers/constants");

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "succes",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not Found Contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
