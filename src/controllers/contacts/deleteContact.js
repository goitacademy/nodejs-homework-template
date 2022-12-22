const Contact = require("../../models/contact");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact whith id=${contactId} not found `,
    });
    return;
  }

  res.json({
    status: "success",
    code: 200,
    message: `Contact whith id=${contactId} deleted `,
  });
};

module.exports = deleteContact;
