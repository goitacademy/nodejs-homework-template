import { Contact } from "../../models/index.js";

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json({ status: "succes", code: 201, data: { result } });
};

export default add;
