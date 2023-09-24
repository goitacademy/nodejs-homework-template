import Contact from "../models/contact.js";
import fs from "fs/promises";
import path from "path";
import { HttpError, cloudinary } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { page = 1, limit = 4, favorite = undefined } = req.query;
  const { _id: owner } = req.user;
  if (favorite !== undefined) {
    const contacts = await Contact.find(
      { owner, favorite },
      "-createdAt -updateAt ",
      {
        skip: (page - 1) * limit,
        limit: limit,
      }
    ).populate("owner", "email subscription");
    res.json(contacts);
    return;
  }
  const contacts = await Contact.find({ owner }, "-createdAt -updateAt ", {
    skip: (page - 1) * limit,
    limit: limit,
  }).populate("owner", "email subscription");
  res.json(contacts);
};

const getById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, `Movie with id: '${id}' not found`);
  }
  res.json(contact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const { url: avatarURL } = await cloudinary.uploader.upload(oldPath, {
    folder: "avatar",
  });
  await fs.unlink(oldPath);
  // const newPath = path.join(path.resolve("public", "avatars"), filename);
  // await fs.rename(oldPath, newPath);
  // const avatarURL = path.join("avatars", filename);
  const addContact = await Contact.create({ ...req.body, owner, avatarURL });
  res.status(201).json(addContact);
};

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndUpdate(id, req.body);
  if (!contact) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json(contact);
};

const favorite = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body.favorite;
  if (body === undefined) {
    throw HttpError(400, "missing field favorite");
  }
  await Contact.findByIdAndUpdate(id, { favorite: body });
  res.status(200).json({
    message: `favorite: ${body} `,
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  favorite: ctrlWrapper(favorite),
};
