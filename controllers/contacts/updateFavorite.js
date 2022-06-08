const contactsOperations = require("../../services/contacts");
const createError = require("http-errors");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const result = await contactsOperations.updateStatusContact(contactId, {
      favorite,
    });
    if (!result) {
      throw createError(400, `missing field favorite`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
