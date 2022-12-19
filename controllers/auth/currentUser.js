const { CURRENT_USER } = require("./authConstants");

async function currentUser(req, res, nest) {
  const { name, email, _id, createdAt } = req.user;

  res.status(200).json({
    status: 200,
    data: {
      id: _id,
      name,
      email,
      createdAt,
    },
    message: CURRENT_USER,
  });
}

module.exports = currentUser;
