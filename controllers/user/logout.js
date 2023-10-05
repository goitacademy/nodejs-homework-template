import { ctrlWrapper } from "../../decorators/index.js";
import User from "../../models/user-model.js";
import {HttpError} from "../../helpers/index.js";

const logout = async (req, res) => {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: "" });
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
  
    res.status(201).json({
      message: "No Content",
    });
  };

export default ctrlWrapper(logout);
