import Contact from "../../model/contactSchema";
import mongoose from "mongoose";

const { Types } = mongoose;

const getStatisticsContacts = async (id) => {
  const data = await Contact.aggregate([
    { $match: { owner: Types.ObjectId(id) } },
    {
      $group: {
        _id: "stats",
        sumAge: { $sum: "$age" },
        minAge: { $min: "$age" },
        maxAge: { $max: "$age" },
        avgAge: { $avg: "$age" },
      },
    },
  ]);
  return data;
};

export default getStatisticsContacts;
