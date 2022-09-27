const { service } = require("../../service");

const addContactById = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await service.createContact(body);
    res.json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    res.status(404).json({
      status: "error",
      message: e.message,
    });
  }
};
module.exports = addContactById;
