const { NotFound } = require("http-errors");

const { removeContact } = require("../../models/contacts");

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (!result) {
    throw new NotFound(`Not found id=${contactId}`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = deleteContactById;
