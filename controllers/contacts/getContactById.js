const { service } = require("../../service");

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await service.getContactById(contactId);
  if (!result) {
    res.status(404).json({
      status: "error",
      message: `Not found contact id: ${contactId}`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact: result },
  });
};
module.exports = getById;
