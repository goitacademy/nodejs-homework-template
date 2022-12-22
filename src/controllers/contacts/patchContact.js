const Contact = require("../../models/contact");

const patchContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact not found",
    });
    return;
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

module.exports = patchContact;
