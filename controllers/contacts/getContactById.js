const { service } = require("../../service");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  try {
    const result = await service.getContactById(contactId);
    res.json({
      status: "success",
      code: 200,
      data: { contact: result },
    });
  } catch (e) {
    res.status(404).json({
      status: "error",
      message: `Not found contact id: ${contactId}`,
    });
  }
};
module.exports = getById;
