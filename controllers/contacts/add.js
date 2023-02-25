const contactOperations = require("../../models/");

const add = async (req, res, next) => {
  const result = await contactOperations.add(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
