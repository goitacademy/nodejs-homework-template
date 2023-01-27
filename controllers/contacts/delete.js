const createError = require("http-errors");
const { Contact } = require("../../models");

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const removedContact = await Contact.findByIdAndRemove(id);

    if (!removedContact) {
      throw new createError.NotFound(
        `Contact with this id: ${id} is not found`
      );
    }
    res.json({
      status: "success",
      message: "contact deleted",
      code: 200,
      result: { removedContact },
    });
  } catch (error) {
    next();
  }
};

module.exports = deleteContact;
