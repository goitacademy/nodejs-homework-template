const service = require("../../service");

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await service.getContactById(id);

  if (!contact) {
    res.status(400).json({ message: "Not found" });
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

module.exports = getById;
