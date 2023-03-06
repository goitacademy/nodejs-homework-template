const { ContactLeaveSchema } = require("../../models");
const { updateFavoriteSchema } = require("../../schemas");
const {  HttpError } = require("../../utils");

const updateStatusContact = async (request, response) => {
    const { error } = updateFavoriteSchema.validate(request.body);
    if (error) {
      throw HttpError(400, "missing field favorite");
    }
    const { id } = request.params;
    const result = await ContactLeaveSchema.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    response.json({
      status: "success",
      code: 200,
      message: "success status contact",
      data: {
        result,
      },
    });
  };

  module.exports = updateStatusContact;