module.exports = app => {
  const tasks = require("../controllers/task.controller");

  var router = require("express").Router();

  // Create new 
  router.post("/tasks", tasks.create);

  // Retrieve all tasks
  router.get("/tasks", tasks.findAll);


  // Update a Task with title
  router.put("/tasks", tasks.update);

  // Delete a Task with title
  router.post("/tasks/delete", tasks.delete);

  // Delete all tasks
  router.delete("/deleteAll", tasks.deleteAll);

  app.use('/api', router);
};