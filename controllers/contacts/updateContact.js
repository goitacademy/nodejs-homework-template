const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(400, "Not found");
  }
  res.json({
    status: "successes",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
