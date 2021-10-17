const { Order } = require("../../model");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const result = await Order.find({ owner: _id }).populate("owner", "email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
