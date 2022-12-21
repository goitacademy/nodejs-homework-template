const contactOperations = require("../../models/contacts");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactOperations.removeContact(contactId);

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
