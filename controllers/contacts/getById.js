const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);

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
    data,
  });
};

module.exports = getById;
