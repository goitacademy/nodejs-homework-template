//task/helpers.js

// tutaj zyje wysokopoziomowa logika

const Task = require("../../models/Task");

const fetchTasks = () => Task.getAll();

const fetchTask = (id) => Task.findById(id);

const insertTask = ({ name, email, phone, favorite }) =>
  Task.create({ name, email, phone, favorite }); // to jest metoda z mongoose, uzyje caly model
// no to teraz jak sie nameczyles z pisaniem tego to zrobimy optymalizacje :)
// const updateTask = async ({ id, toUpdate }) => {
//   const task = await Task.findById(id);
//   if (!task) {
//     return null;
//   }
//   Object.keys(toUpdate).forEach((updateKey) => {
//     task[updateKey] = toUpdate[updateKey];
//   });
//   awaittask.save();
//   return task;
// };
const updateTask = ({ id, toUpdate, upsert = false }) =>
  Task.findOneAndUpdate(
    { _id: id },
    { $set: toUpdate },
    { new: true, runValidators: true, strict: "throw", upsert }
  );

// const removeTask = (id) => Task.findByIdAndDelete(id);
// const removeTask = (id) => Task.deleteOne(_id: id); // teraz jak to napisalem to idziesz do /tasks/index
// const removeTask = (id) => Task.deleteOne({ _id: id });
const removeTask = async (id) => {
  try {
    console.log("Removing task with id:", id);
    const result = await Task.deleteOne({ _id: id });
    console.log("Delete result:", result);
    return result;
  } catch (error) {
    console.error("Error while removing task:", error);
    throw error;
  }
};

module.exports = { fetchTasks, fetchTask, insertTask, updateTask, removeTask };
