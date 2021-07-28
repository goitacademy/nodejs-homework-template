const { Contact } = require("../../models/index");

const updateFav = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  try {
    if (body.favorite === undefined) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Missing field favorite",
      });
    }
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
};
module.exports = updateFav;
