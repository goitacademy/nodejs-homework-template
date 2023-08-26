// const contactsSchemas = require("../../schemas/users");
// const User = require("../../models/users");

// async function subscription(req, res, next) {
//   const userId = req.params;
//   console.log(userId);
//   // try {
//   //   const response = contactsSchemas.validate(req.body);
//   //   if (typeof response.error !== "undefined") {
//   //     return res.status(400).send({ message: "missing required name field" });
//   //   }
//   //   const { subscription } = req.body;
//   //   const newContact = {
//   //     subscription: subscription,
//   //   };

//   //   const doc = await Contact.findByIdAndUpdate(contactId, newContact, {
//   //     new: true,
//   //   }).exec();
//   //   if (doc === null) {
//   //     return res.status(404).json({ message: "Contact not found" });
//   //   }

//   //   res.send(doc);
//   // } catch (error) {
//   //   next(error);
//   // }
//   return res.end();
// }
// module.exports = { subscription };
