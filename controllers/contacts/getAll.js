const { Contact } = require("../../model");
const getAll = async (req, res, next) => {
  try {
    const data = await Contact.find({});
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
