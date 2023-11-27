import { HttpError } from "../helpers/index.js";
import Contact from "../models/Сontacts.js";

export const contactsGet = async (req, res, next) => {
  let { page = 1, limit = 10, ...query } = req.query;
  const { _id: owner } = req.user;
  const filter = { owner, ...query };

  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    limit,
    skip: (page - 1) * limit,
  });
  const total = await Contact.countDocuments(filter);
  res.json({ data: result, totalHits: total.toString(), page, perPage: limit });
};

export const contactGetById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json(result);
};

export const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    name: result.name,
    email: result.email,
    phone: result.phone,
    favorite: result.favorite,
    id: result._id,
  });
};

export const remove = async (req, res, next) => {
  const { _id: owner } = req.user;
  const _id = req.params.contactId;
  const result = await Contact.findOneAndDelete({ _id, owner });
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.status(200).json({ message: "Contact deleted" });
};

export const updateById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const _id = req.params.contactId;
  const body = req.body;
  const result = await Contact.findOneAndUpdate({ _id, owner }, body, {
    new: true,
    select: "-createdAt",
  });
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.status(200).json(result);
};

export const updateStatusContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const _id = req.params.contactId;
  const body = req.body;
  const result = await Contact.findOneAndUpdate({ _id, owner }, body, {
    new: true,
    select: "-createdAt",
  });
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.status(200).json(result);
};
