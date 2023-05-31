const Contact = require("../../models/contact")

async function putContactFildFavorite(req, res, next) {
  try {
    
 
  const id = req.params.contactId;
  console.log(req.body);
  if (!Object.values(req.body).length) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const result =  await Contact.findByIdAndUpdate(id, req.body, {new: true})
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
} catch (error) {
  console.log(error);
  next(error);
}
}

module.exports = putContactFildFavorite