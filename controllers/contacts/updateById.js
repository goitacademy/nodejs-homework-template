const { Contact } = require("../../models");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!data) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

  if (!req.body) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data,
  });
};

module.exports = updateById;
