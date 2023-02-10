const { Contact } = require("../../models/contact");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      const { error } = new Error(`Contact with id=${id} not found`);
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: result,
      },
    });
  } catch (error) {
    next(error);
  }
  // res.json({ message: "contact deleted" });
};

module.exports = deleteContact;
