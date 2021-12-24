import { listContacts } from "../../repository";
import { HttpCode } from "../../lib/constants";

export const getContacts = async (req, res, next) => {
  console.log(req.query);
  const contacts = await listContacts(req.query);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
};