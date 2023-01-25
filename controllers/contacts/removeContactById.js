const contactsOperations = require("../../models/contacts");

const removeContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContactById(contactId);
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {result}
    });
}


module.exports = removeContactById;