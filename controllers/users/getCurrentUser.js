import { HttpCode } from "../../lib/constants";

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  console.log(req.user);
  if (!req.user.token || !req.user.id) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  }
  res.json({
    status: "success",
    code: HttpCode.OK,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};
export default getCurrentUser;
