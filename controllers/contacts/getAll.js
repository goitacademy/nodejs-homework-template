const { Contact } = require("../../model");

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
