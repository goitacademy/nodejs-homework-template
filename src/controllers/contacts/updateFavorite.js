const { Contact } = require("../../models");


const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!result) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Not found",
      });
    }
    

    if (!req.body) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing field favorite",
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: { data: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
