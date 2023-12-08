<<<<<<< HEAD
const { Contact, schema } = require("../../models/contact");
=======
const Contact = require("../../models/contact");
const { schema } = require("../../schemas/schemaJoi");
>>>>>>> f897728d66c7cfeaa230c21584b96a891cbf5b99

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