const { Order } = require("../../models/order");

const getAllOrders = async (req, res) => {
  const result = await Order.find({ owner: req.user._id }).populate(
    "owner",
    "_id email"
  );
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllOrders;
