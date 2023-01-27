const contactsOperations = require("../../routes/api/contacts");

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.remove(contactId, req.body);
  res.status(200).json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = remove;
