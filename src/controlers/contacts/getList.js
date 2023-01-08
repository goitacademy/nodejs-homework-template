const server = require("../../services/contacts");

const getList = async (req, res) => {
  try {
    const { _id } = req.user;
    // console.log(_id);
    const list = await server.listContacts(_id);
    console.log("list", list);
    res.json(list);
    // console.log("first");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getList,
};
