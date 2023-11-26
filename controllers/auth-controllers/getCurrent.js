import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

export default ctrlWrapper(getCurrent);
