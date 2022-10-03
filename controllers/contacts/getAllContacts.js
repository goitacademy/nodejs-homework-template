const { service } = require("../../service");

const getAll = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: "error",
      message: e.message,
    });
  }
};
module.exports = getAll;
