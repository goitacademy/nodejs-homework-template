const contactsOperations = require("../../models/contacts");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!contactId) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    const result = await contactsOperations.removeContact(contactId);
    console.log(result);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
