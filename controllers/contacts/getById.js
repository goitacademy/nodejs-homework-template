const contactsOperation = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.getContactById(contactId);
  if (result) {
    return res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } else {
    const error = new Error(`Contact with id ${contactId} not found`);
    error.status = 404;
    throw error;
  }
};

module.exports = getById;
