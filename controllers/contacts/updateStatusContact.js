const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  if (!req.body) {
    const error = new Error("Missing field favorite");
    error.status = 400;
    throw error;
  }
  const { favorite } = req.body;

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: 200,
    data: { result },
  });
};

module.exports = updateStatusContact;
