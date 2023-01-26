const RequestError = require("../../helpers/requestError");
const service = require("../../services");

const getByID = async (req, res) => {
  const { id } = req.params;
  const result = await service.getByID(id);

  if (!result) {
    throw RequestError(404, `contact with id:${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getByID;
