const service = require("../../services");

const getByID = async (req, res) => {
  const { id } = req.params;
  const result = await service.getByID(id);

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getByID;
