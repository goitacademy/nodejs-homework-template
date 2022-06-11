const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { favorite } = req.body;

  if (favorite === undefined) {
    res.status(400).json({
      status: 400,
      data: { message: "Missing field favorite" },
    });
  }

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
