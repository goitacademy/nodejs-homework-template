const { Contact } = require("../../models");
const { HttpError } = require("../../utils");

const updateStatusContact = async (request, response) => {
  const { id } = request.params;
  const result = await Contact.findByIdAndUpdate(id, request.body, {
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
