const { NotFound } = require("http-errors");

const { removeContact } = require("../../models/contacts");

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw new NotFound("Not found");
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

module.exports = deleteContact;