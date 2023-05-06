const currentUser = async (req, res) => {
    const {email, name} = req.user;

  return  res.json({
        email,
        name,
    })
}

  module.exports = currentUser;

































   

