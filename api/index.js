// tu jest routing, wszystkie sciezki
const express = require("express");
const router = express.Router();
const tasks = require("../controllers/tasks");

router.get("/tasks", tasks.getAllTasks);
router.get("/tasks/:id", tasks.getTask);
router.post("/tasks", tasks.createTask);
// Poprawka: Użyj funkcji putTask zamiast updateTask
router.put("/tasks/:id", tasks.putTask);
router.patch("/tasks/:id", tasks.patchTask);
router.delete("/tasks/:id", tasks.deleteTask);

module.exports = router;

// // tu jest routing, wszystkie sciezki
// const express = require("express");
// const router = express.Router();
// // const { getAllTasks } = require("../controllers/tasks");
// // const tasks = require("../controllers/tasks/");
// const tasks = require("../controllers/tasks");
// // router.get("/tasks",
// // // async (req, res) => {
// // //   const tasks = await Task.find(); ---------------> to zakomentowane jest wyciete i przeniesione do index.js w folderze controllers
// // //   res.json(tasks);
// // });
// router.get("/tasks", tasks.getAllTasks);

// // router.get("/tasks/:id", tasks.getTask);
// router.get("/tasks/:id", tasks.getTask);
// // teraz przygotowuje sciezke dla endtpointu post, åamietaj najpierw piszesz tutaj
// router.post("/tasks", tasks.createTask);
// // Poprawka: Użyj funkcji updateTask zamiast putTask
// router.put("/tasks/:id", tasks.updateTask);
// router.patch("/tasks/:id", tasks.patchTask);

// module.exports = router;
// // to jest endtpoint, ktory bedzie zwracal wszystkie taski
// //tu na koniec w przedostatniej po tasks dajemy przecinek i wrzucamy getAllTasks
