// DELETE contact
const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (result) {
      res.status(200).json({
        data: { contact: result },
        message: 'contact deleted',
      });
    } else {
      throw createError(404);
      // res.status(404).json({
      //   message: `Not found contact id: ${id}`,
      //   data: "Not Found",
      // });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = remove;
