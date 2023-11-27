const Events = require("../models/eventsModel");
const catchAsync = require("../utils/cathAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createEvent = catchAsync(async (req, res) => {
  const event = await Events.create(req.body);
  res.status(201).json(event);
});

exports.getAllEvents = catchAsync(async (req, res) => {
  const features = new APIFeatures(Events.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields();

  const events = await features.query;
  res.status(200).json({
    status: "success",
    results: events.length,
    data: { events },
  });
});

exports.getEventById = catchAsync(async (req, res, next) => {
  const event = await Events.findById(req.params.id);

  if (!event) return next(new AppError("No event with such id", 404));

  res.status(200).json(event);
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const event = await Events.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) return next(new AppError("No event with such id", 404));

  res.status(200).json(event);
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Events.findByIdAndDelete(req.params.id);

  if (!event) return next(new AppError("No event with such id", 404));

  res.status(204).json({
    status: "deleted",
    data: null,
  });
});
