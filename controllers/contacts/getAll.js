const contactsOperations = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await contactsOperations.asyncHandler(
    contactsOperations.listContacts
  );
  res.status(200).json({
    status: "success",
    code: 200,
    message: "all contacts fetched",
    data: { result: contacts },
  });
};

module.exports = getAll;
