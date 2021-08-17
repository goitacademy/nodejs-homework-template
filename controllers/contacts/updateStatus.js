const { contacts: service } = require("../../services");

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        message: "contact update",
        data: { contact },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        data: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatus;