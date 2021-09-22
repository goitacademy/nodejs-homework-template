const { Contact } = require("../../models");

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updateContact) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: { updateContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
