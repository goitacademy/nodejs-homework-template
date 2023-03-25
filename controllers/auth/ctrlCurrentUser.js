import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";

const getCurrentUserData = async ({ user }, res) => {
  const { email, name } = user;
  res.json({ email, name });
};

const ctrlCurrentUser = ctrlWrapper(getCurrentUserData);
export default ctrlCurrentUser;
