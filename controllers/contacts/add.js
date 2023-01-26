const service = require("../../services");

const add = async (req, res, next) => {
  const result = await service.add(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
