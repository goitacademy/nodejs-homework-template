import { ctrlWrapper } from "../../decorator/index.js";

const current = async (req, res, next) => {
  const { name, email } = req.user;
  res.json({
    name,
    email,
  });
};

export default ctrlWrapper(current);
