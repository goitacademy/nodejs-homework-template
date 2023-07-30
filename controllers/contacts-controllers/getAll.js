import Contact from "../../models/contact.js";

const getAll = async (request, response, next) => {
  try {
    const { _id: owner } = request.user;
    const { page = 1, limit = 10 } = request.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    response.json(result);
  } catch (error) {
    next(error);
  }
};

export default getAll;
