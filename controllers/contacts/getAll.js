import Contact from "../../models/contact-model.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, ...query } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner, ...query },"-createdAt", { skip, limit });
    res.json(result);
  };
  
  export default ctrlWrapper(getAll);