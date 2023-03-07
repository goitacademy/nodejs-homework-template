const service = require("../../service/service");

const getContacts = async (req, res, next) => {
  try {
    const list = await service.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: list,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getContacts;