

const logout = async (req, res) => {
    try {
      req.user.token = null;
      await req.user.save();
  
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

  module.exports = {logout};