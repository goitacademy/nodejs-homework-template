const { getCurrentUser, editSubscription } = require("../services/users");

class Users {
  async getUser(req, res) {
    const { id } = req.user;

    const user = await getCurrentUser(id);
    res.json({
      status: "success",
      data: { email: user.email, subscription: user.subscription },
    });
  }

  async changeSubscription(req, res) {
    const { subscription } = req.body;
    const { _id } = req.user;

    const user = await editSubscription(_id, subscription);
    res.json({
      status: "success",
      data: { email: user.email, subscription: user.subscription },
    });
  }
}

module.exports = Users;
