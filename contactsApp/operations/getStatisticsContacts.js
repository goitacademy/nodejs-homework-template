import Contact from "../../model/contact";
import mongoose from "mongoose";
const { Types } = mongoose;

const getStatisticsContacts = async(id) => {
    const data = await Contact.aggregate([
        { $match: { owner: Types.ObjectId(id) } },
        { $group: { 
            _id: "stats", 
            totalAge: { $sum: "$age" }, 
            maxAge: { $max: "$age" }, 
            minAge: { $min: "$age" }, 
            avgAge: { $avg: "$age" }, 
    } 
},
    ])
    return data;
}

export default getStatisticsContacts;