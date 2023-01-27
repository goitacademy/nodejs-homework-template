const contactsOperations = require("../../routes/api/contacts");

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.remove(contactId, req.body);
    res.status(200).json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    error.status = 400;
    throw error;
  }
};

module.exports = remove;
