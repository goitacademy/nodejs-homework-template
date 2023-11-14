import { HTTP_STATUS } from "../../constants/index.js";
import { crypt } from "../../helpers/index.js";
import { User } from "../../models/index.js";

export const signup = async ({ body }, res) => {
  const password = await crypt.hash(body.password);
  const { name, email } = await User.create({ ...body, password });

  res.status(HTTP_STATUS.created).json({ name, email });
};
