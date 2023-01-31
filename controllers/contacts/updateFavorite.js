const { Contact } = require("../../models");

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
     return res.status(404).json({ message: "Bad request" })
    }
    res.json({
      status: "Success",
      code: 200,
      message: "contact updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;