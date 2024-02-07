const {
  fetchTasks,
  fetchTask,
  insertTask,
  updateTask,
  removeTask,
} = require("../../controllers/tasks/helpers");

// gotowe endpointy
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await fetchTasks();

    res.json(tasks);
  } catch (err) {
    const tasks = await fetchTasks();
    next(err);
  }
};

// teraz tworzymy kontroler dla getTask ktory tworzylismy w index api

const getTask = async (req, res, next) => {
  try {
    const task = await fetchTask(req.params.id);
    if (task) {
      res.json({ ...task, html: task.htmlfy() });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    next(err);
  }
};

// teraz tworze taska, ktorego zaczynalem pisac w api/index.js

const createTask = async (req, res, next) => {
  const { name, surname, email, phone, favorite } = req.body;
  try {
    const result = await insertTask({
      name,
      surname,
      email,
      phone,
      favorite,
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
// put
const putTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateTask({ id, toUpdate: req.body, upsert: true });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
// dodaje kolejnego taska ktory zaczalem w api/index.js
const patchTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateTask({ id, toUpdate: req.body });
    if (!result) {
      res.status(404).json({ message: "Task not found" });
      next();
    } else {
      res.json(result);
    }
  } catch (err) {
    return next(err);
  }
};

// const deleteTask = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     await removeTask(id);
//     res.status(204).send();
//   } catch (err) {
//     next(err);
//   }
// };
const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Usuń dodatkowe cudzysłowy z identyfikatora
    const cleanedId = id.replace(/"/g, "");
    await removeTask(cleanedId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

//jak go zrobiles to lecisz do pliku helpers

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  patchTask,
  putTask,
  deleteTask,
};
