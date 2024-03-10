import Contact from "../../models/contactModel.js";
export async function updateFavouriteStatus(req, res, next) {
  const contactId = req.params.contactId;
  const { favourite } = req.body;

  if (favourite === undefined) {
    return res.status(400).json({ message: "missing field favourite" });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true } // Zwraca zaktualizowany dokument
    );

    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}