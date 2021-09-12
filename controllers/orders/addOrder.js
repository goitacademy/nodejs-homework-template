const { Order } = require("../../models/order");

const addOrder = async (req, res) => {
  const newOrder = { ...req.body, owner: req.user._id };
  const result = await Order.create(newOrder);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addOrder;
