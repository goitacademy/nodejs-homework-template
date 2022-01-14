import Contact from "../../model/contact";

export const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      id: contactId,
      owner: userId,
    },
    { ...body },
    { new: true }
  );
  console.log(result);
  return result;
};
