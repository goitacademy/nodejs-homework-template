const contactsOperations = require("../../model");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "Succsess",
      code: 200,
      result: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
