import { query } from "express";
import { Contact } from "../../models/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner, ...query },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner");

  res.json({
    status: "succes",
    code: 200,
    qty: result.length,
    data: { result },
  });
};

export default getAll;
