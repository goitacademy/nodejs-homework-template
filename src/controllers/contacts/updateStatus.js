const service = require("../../service");

const updateStatus = async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  await service.updateStatusContact(id, req.body);

  res.status(200).json({
    status: "contact update",
    code: 200,
  });
};

module.exports = updateStatus;
