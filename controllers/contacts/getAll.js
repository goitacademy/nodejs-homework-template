import models from "../../models/index.js";

const { contactModel } = models;
const { Contact } = contactModel;

export const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;
  const skip = (page - 1) * limit;

  let resultWithStatus;
  if (favorite) {
    resultWithStatus = await Contact.find({
      owner: _id,
      favorite: favorite,
    }).populate("owner", "_id email");
  }

  const resultWithoutStatus = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contacts received",
    data: {
      result: resultWithStatus || resultWithoutStatus,
    },
  });
};
