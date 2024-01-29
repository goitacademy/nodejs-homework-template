import { User } from "#schemas/users.js";

export const logoutUser = async (req, res, next) => {
  try {
    if (!req.user || !req.user.token) {
      return { error: "Unauthorized" };
    }
    // Logout success response
    const { id } = req.user;
    await User.findByIdAndUpdate({ _id: id }, { token: null }, { new: true });
    return res.status(204).json({
      status: "204 No Content",
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
};
