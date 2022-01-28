const createError = require("http-errors");

const { Contact } = require("../../models");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404, `Contact with id '${contactId}' not found`);
  }

  res.status(200).json({
    status: "seccess",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
