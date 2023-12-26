import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";
import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const contactAvatarsPath = path.resolve("public", "contact-avatars");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }

  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  const total = await Contact.countDocuments({ owner });
  res.json({ result, total });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id= ${contactId} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const { name, email } = req.body;
  let avatarContactURL;

  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newFilename = `${name
      .split(" ")
      .join("_")
      .toLowerCase()}_${owner}.${filename.split(".").pop()}`;
    const newPath = path.join(contactAvatarsPath, newFilename);
    const tempPath = path.join("temp", filename);

    try {
      const image = await Jimp.read(oldPath);
      await image
        .autocrop()
        .resize(150, 150, Jimp.RESIZE_BEZIER)
        .circle()
        .write(newPath);
    } catch (err) {
      throw HttpError(500, "Error processing image");
    }
    avatarContactURL = path.join("contact-avatars", newFilename);
    await fs.unlink(tempPath);
  }
  if (!req.file) {
    avatarContactURL = gravatar.url(email, {
      s: 400,
      r: "pg",
      d: "mm",
    });
  }

  const result = await Contact.create({ ...req.body, avatarContactURL, owner });
  res.status(201).json(result);
  avatarContactURL = null;
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id= ${contactId} not found`);
  }
  res.json(result);
};

const updateContactFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id= ${contactId} not found`);
  }
  res.json(result);
};

const updateContactAvatar = async (req, res) => {
  const { contactId } = req.params;
  const { name } = await Contact.findById(contactId);
  const { _id: owner } = req.user;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { path: oldPath, filename } = req.file;
  const newFilename = `${name
    .split(" ")
    .join("_")
    .toLowerCase()}_${owner}.${filename.split(".").pop()}`;
  const newPath = path.join(contactAvatarsPath, newFilename);
  const tempPath = path.join("temp", filename);

  try {
    const image = await Jimp.read(oldPath);
    await image
      .autocrop()
      .resize(150, 150, Jimp.RESIZE_BEZIER)
      .circle()
      .write(newPath);
  } catch (err) {
    throw HttpError(500, "Error processing image");
  }

  const newContactAvatarURL = path.join("contact-avatars", newFilename);

  const result = await Contact.findByIdAndUpdate(contactId, {
    avatarContactURL: newContactAvatarURL,
  });

  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  await fs.unlink(tempPath);
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id= ${id} not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateContactFavorite: ctrlWrapper(updateContactFavorite),
  updateContactAvatar: ctrlWrapper(updateContactAvatar),
  deleteById: ctrlWrapper(deleteById),
};
