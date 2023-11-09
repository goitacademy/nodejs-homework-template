import { Contact } from "../../models/index.js";

const DEF_PAGE = 1;
const DEF_LIMIT = 20;

export const getAll = async ({ user, query }, res) => {
  const owner = user._id;

  const { page = DEF_PAGE, limit = DEF_LIMIT, ...searchCriteria } = query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, ...searchCriteria },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email name subscription");

  res.json(result);
};
