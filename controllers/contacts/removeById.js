const { removeContact } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId, req.body);
  if (deletedContact) {
    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        deletedContact,
      },
    });
  } else {
    throw new NotFound("Not found");
  }
};

module.exports = removeById;
