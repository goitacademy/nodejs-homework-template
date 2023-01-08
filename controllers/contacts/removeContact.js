const contactsOperations = require("../../models/contacts");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      const error = new Error(`Contact with id ${contactId} not found`);
      error.status = 404;
      throw error;      
    }
    res.json({
      status: "success",
      code: 200,
      message: `Contact width id ${contactId} deleted`,
      data: {
        result
      }
})
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact;