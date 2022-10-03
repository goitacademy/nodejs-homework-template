const { serviceContacts } = require("../../service");

const getAll = async (req, res, next) => {
  try {
    const results = await serviceContacts.getAllContacts();
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
