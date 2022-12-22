const Contact = require("../../models/contact");

const getContactId = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
    return;
  }

  res.json({
    status: "success",
    code: 200,
    message: `Contact with id=${contactId} found`,
    data: {
      result,
    },
  });
};

module.exports = getContactId;
