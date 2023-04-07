const { Contact } = require("../../models");
const createError = require("http-errors");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw createError(404, `contact with id: ${id} not found`);
  }

  res.json({
    status: "succes",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeContact;
