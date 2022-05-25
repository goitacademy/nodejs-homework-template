const { Contact } = require("../../models");

const updateByFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id ${contactId} not found`,
    });
    return;
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateByFavorite;
