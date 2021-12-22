import model from "../../model/contacts";

const updateStatusContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await model.updateStatusContact(id, req.body);
  if (!req.body) {
    res.status(400).json({ message: "missing field favorite" });
  } else {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
};

export default updateStatusContactController;
