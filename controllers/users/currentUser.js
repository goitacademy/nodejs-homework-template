// controllers/users/currentUser.js
import User from "#models/users.js";

const currentUser = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    return res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `An error occurred: ${err.message}` });
  }
};

export { currentUser };
