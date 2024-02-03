// controllers/users/logout.js
import User from "#models/users.js";

async function logout(req, res) {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.token = null;
    await user.save();

    return res.status(204).end();
  } catch (err) {
    return res
      .status(500)
      .json({ message: `An error occurred: ${err.message}` });
  }
}

export { logout };
