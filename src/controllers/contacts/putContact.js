const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFound("Contact not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "Update contact",
    data: {
      result,
    },
  });
};

module.exports = putContact;
