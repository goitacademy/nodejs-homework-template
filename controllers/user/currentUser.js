const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  await res.json({
    status: "Success",
    code: 200,
    ResponseBody: { email, subscription },
  });
};

module.exports = currentUser;