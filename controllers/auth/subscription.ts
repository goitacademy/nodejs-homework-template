import { Request, Response } from "express";
import { User, IUser } from "../../models/user/user";

import { HttpError } from "../../helpers";

const subscription = async (req: Request, res: Response) => {
  const { _id }: IUser = req.user as IUser;

  const { subscription } = req.body;

  if (!subscription) {
    res.status(400).json({ message: "missing field subscription" });
    return;
  }

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default subscription;
