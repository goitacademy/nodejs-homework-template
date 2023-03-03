const currentUser = async (req, res) => {
  const { email, name, _id } = req.user;
  res.json({
    status: "succsess",
    code: 200,
    data: {
      user: {
        _id,
        email,
        name,
      },
    },
  });
};

module.exports = currentUser;
