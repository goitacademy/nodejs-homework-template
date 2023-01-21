// const contactOperations = require("../../models/contacts");
const createError = require("http-errors");

const { Contact } = require("../../models");
const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
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

module.exports = updateStatus;
