const auth = async (req, res) => {
  await res.json({
    status: "success",
    code: 200,
    message: "Hi it`s auth page",
  });
};

module.exports = auth;
