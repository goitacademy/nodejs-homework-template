import { Contacts } from "#models/contacts.shema.js";

async function updateStatusContact(req, res, next) {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  if (!favorite) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const updatedStatus = await Contacts.findByIdAndUpdate(contactId, {
      $set: { favorite },
    });

    if (updatedStatus) {
      return res.status(200).json({ message: "Update successful" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(`An error occurred: ${e}`);
  }
}

export { updateStatusContact };
