const { Contact } = require("../../utils/models");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { favorite: !body.favorite },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = updateStatusContact;
