import Contact from "../../model/contact";

export const listContacts = async (userId) => {
  const result = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "name, number, email, subscription",
  });
  return result;
};
