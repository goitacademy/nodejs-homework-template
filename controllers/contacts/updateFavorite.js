const { Contacts } = require("../../models/contacts");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const result = await Contacts.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "Contact updated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
