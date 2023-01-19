const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");
const updateFavoriteSchema = require("../../models/contact");

const favorite = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    error.status = 400;
    error.message = "missing field favorite";
    throw error;
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  } else {
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }
};

module.exports = favorite;
