const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw new NotFound(`Contact whith id=${contactId} not found `);
  }

  res.json({
    status: "success",
    code: 200,
    message: `Contact whith id=${contactId} deleted `,
  });
};

module.exports = deleteContact;
