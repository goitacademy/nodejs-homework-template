const { Contact } = require("../../models");

const listContacts = async (request, response) => {
  const { _id: owner } = request.user;
  const { page = 1, limit = 20 } = request.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "_id email");
  response.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
