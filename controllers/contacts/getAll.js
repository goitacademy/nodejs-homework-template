const { listContacts } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const result = await listContacts();
  try {
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = getAll;
