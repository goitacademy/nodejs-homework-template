const contactsOperations = require("../../model");
const createError = require("http-errors");
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const dlt = await contactsOperations.removeContact(contactId);

    if (!dlt) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "succsess",
      code: 200,
      message: "contact deleted",
      result: dlt,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
