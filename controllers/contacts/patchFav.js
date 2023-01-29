const { Contact } = require("../../models");

const patchFav = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    if (!contact) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({ status: "success", code: 200, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = patchFav;
