import fs from "fs/promises";
import path from "path";
import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import gravatar from "gravatar";
import { HttpError } from "../helpers/index";
import Contact from "../models/Contact";
import { ctrlContactWrapper } from "../decorators/index";
import { IUser } from "../types/index";
import { isDev } from "../utils/currEnv";

const avatarsPath = path.resolve(isDev ? "src" : "dist", "public", "avatars");

const getAll = async (
  req: Request & IUser,
  res: Response,
  next: NextFunction
) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...filterQueryParams } = req.query;

  const numLimit = Number(limit);
  const skip = (Number(page) - 1) * numLimit;

  const count = await Contact.countDocuments({ owner });

  const filterQuery = { owner, ...filterQueryParams };

  const result = await Contact.find(filterQuery, "-createdAt -updatedAt", {
    skip,
    numLimit,
  }).populate("owner", "email subscription");

  //*Будуть отримані ті фільми, якщо цей користувач їх додав
  res.json({
    result,
    total: count,
    per_page: limit,
  });
};

const getById = async (
  req: Request & IUser,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw HttpError(
      404,
      `OOps such contact with id - ${contactId} not found 😥`
    );
  }
  res.json(result);
};

const add = async (req: Request & IUser, res: Response, next: NextFunction) => {
  let avatar;

  if (req.headers["content-type"] === "application/json") {
    throw HttpError(400, "Invalid Content-Type");
  }

  const { _id: owner } = req.user;

  if (req.file) {
    const { path: oldPath, filename } = req.file as Express.Multer.File;
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);

    avatar = path.join("avatars", filename);
  } else {
    avatar = req.user.avatarURL;
  }
  const result = await Contact.create({ ...req.body, avatar, owner });
  res.status(201).json(result);
};

const updateById = async (
  req: Request & IUser,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );

  if (!result) {
    throw HttpError(
      404,
      `OOps such contact with id - ${contactId} not found 😥`
    );
  }

  res.status(200).json(result);
};

const deleteById = async (
  req: Request & IUser,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });

  if (!result) {
    throw HttpError(
      404,
      `OOps such contact with id - ${contactId} not found 😥`
    );
  }

  res.status(200).json({ message: "contact was success deleted" });
};

export default {
  getAll: ctrlContactWrapper(getAll),
  getById: ctrlContactWrapper(getById),
  add: ctrlContactWrapper(add),
  updateById: ctrlContactWrapper(updateById),
  deleteById: ctrlContactWrapper(deleteById),
};
