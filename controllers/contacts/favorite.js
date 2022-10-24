// const { Contact } = require("../../models/contact");

const favorite = async (req, res) => {
  console.log(req.query);
  //   const result = await Contact.find(
  //     { favorite: true },
  //     "-createdAt -updatedAt"
  //   );
  //   res.json(result);
};

module.exports = favorite;
