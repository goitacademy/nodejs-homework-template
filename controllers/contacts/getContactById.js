const { operations } = require("../../model/contacts");
const { NotFound } = require("http-errors");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await operations.getContactById(contactId);
    if (!contact) {
      return NotFound(
        `Contact with ${contactId} not found . Please try to find other contact.`,
      );
    }
    res.json({
      staus: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
