const { Contact } = require("../../models");
const createError = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createError(404, `Contact with id=${contactId} not found`);
    // const error = new Error(`Contact with id=${contactId} not found`);
    // error.status = 404;
    // throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = getById;
