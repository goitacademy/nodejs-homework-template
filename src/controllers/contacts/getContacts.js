const service = require("../../service");

const getContacts = async (req, res) => {
  const results = await service.getAllContacts();
  res.json({
    status: "success",
    code: 200,
    data: results,
  });
};

module.exports = { getContacts };
