const service = require("../../services");

const update = async (req, res) => {
  const { id } = req.params;
  const result = await service.update(id, req.body);

  res.json({
    status: "success",
    code: 200,
    message: `updated contact ${req.body.name} with id:${id}`,
    data: {
      result,
    },
  });
};

module.exports = update;
