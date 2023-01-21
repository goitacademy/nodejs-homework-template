// const contactOperations = require("../../models/contacts");
const createError = require("http-errors");

const { Contact } = require("../../models");
const updateById = async (req, res, next) => {
  const { body } = req;

  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw createError(
      404,
      `Contact with contactId - ${contactId} is not found`
    );
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

module.exports = updateById;
