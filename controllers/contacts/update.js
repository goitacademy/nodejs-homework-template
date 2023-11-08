const { Contact, schema } = require("../../models/contact");

const update = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error } = schema.validate(body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updatedContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "updated success",
    data: {
      result: updatedContact,
    },
  });
};

module.exports = update;
