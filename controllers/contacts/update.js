const RequestError = require("../../helpers/requestError");
const service = require("../../services");

const update = async (req, res) => {
  const { id } = req.params;
  const result = await service.update(id, req.body);

  if (!result) {
    throw RequestError(404, `contact with id:${id} not found`);
  }

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
