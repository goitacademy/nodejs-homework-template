const contactsOperations = require("../../models");

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.remove(contactId, req.body);
  if (!result) {
    const error = new Error("not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = remove;
