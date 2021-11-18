const { Product } = require("../../model");

const updateStatusContact = async (req, res, next) => {
  const { favorite } = req.body;

  try {
    const { contactId } = req.params;
    const result = await Product.findByIdAndUpdate(contactId, favorite, {
      new: true,
    });
    if (!result) {
      res.status(400).json({ message: "missing field favorite" });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = updateStatusContact;
