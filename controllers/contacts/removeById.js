const { Contact } = require("../../models");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await Contact.findByIdAndRemove(contactId);
    if (!removedContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
