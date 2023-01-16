const service = require("../../service");

const updateContact = async (req, res) => {
  const { id } = req.params;

  await service.updateContact(id, req.body);

  res.status(200).json({
    status: "contact update",
    code: 200,
  });
};

module.exports = updateContact;
