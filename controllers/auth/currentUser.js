const { currentUser } = require("../../servises/user");

const currentUserController = async (req, res) => {
  try {

    const { _id } = req.user;

    const { email, subscription } = await currentUser(_id);

    res.status(200).json({ email, subscription });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  currentUser: currentUserController,
};
