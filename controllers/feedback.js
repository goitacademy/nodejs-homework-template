const Feedback = require("../models/modelFeedback");
const { HttpError, ctrlWrapper } = require("../helpers");

const addFeedback = async (req, res) => {
  //   console.log(req);
  //   const { _id: owner } = req.feedback;
  const data = await Feedback.create({ ...req.body });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(data);
};
const getAllFeedback = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const { _id: owner } = req.user;
  const data = await Feedback.find({ owner }, "-createdAt -updatedAt -owner", {
    skip,
    limit,
  });
  res.json(data);
};
const getFeedbackById = async (req, res) => {
  const id = req.params.contactId;
  const data = await Feedback.findById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};
const deleteFeedbackById = async (req, res) => {
  const id = req.params.contactId;
  const data = await Feedback.findByIdAndRemove(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "deleted contact",
  });
};

module.exports = {
  getAllFeedback: ctrlWrapper(getAllFeedback),
  getFeedbackById: ctrlWrapper(getFeedbackById),
  addFeedback: ctrlWrapper(addFeedback),
  deleteFeedbackById: ctrlWrapper(deleteFeedbackById),
};
