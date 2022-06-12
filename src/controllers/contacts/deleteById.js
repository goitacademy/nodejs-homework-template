const { Contact } = require("../../models");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndDelete(contactId);

  if (!data) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data,
  });
};

module.exports = deleteById;
