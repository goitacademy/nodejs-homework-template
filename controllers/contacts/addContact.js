const { service } = require("../../service");

const addContactById = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await service.createContact(body);

    if (result) {
      res.json({
        status: "success",
        code: 201,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = addContactById;
