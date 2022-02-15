const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;
// Create and Save 
exports.create = (req, res) => {
     // Valtitleate request
    if (!req.body.taskTitle) {
            res.status(400).send({
            message: "Title can not be empty!",
        });
        return;
    }

    // Create a task
    const task = {
        taskTitle: req.body.taskTitle,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        
    };

    // Save task in the database
    Task.create(task)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the task.",
            });
        });
};
// Retrieve all 
exports.findAll = (req, res) => {
    const title = req.query.titleSearch;
    var condition = title ? { taskTitle: { [Op.like]: `%${title}%` } } : null;

    Task.findAll({ where: condition })
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving tasks",
        });
    });
};

// Update  by the title in the request
exports.update = (req, res) => {
    const oldtitle = req.body.oldTitle;
    const taskUpdate = req.body.task;
    Task.destroy({
        where: { taskTitle: oldtitle },
        })
        .then((num) => {
            if (num == 1) {
                    Task.create(taskUpdate)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                            err.message || "Some error occurred while updating the task.",
                        });
                    });
            }
            else {
                res.send({
                    message: ` Cannot delete to update `,
                });
            }
            })
            .catch((err) => {
            res.status(500).send({
            message: "Could not delete to update",
            });
        });

};
// Delete  with the specified title list in the request
exports.delete = (req, res) => {
    console.log(req.body);
    Task.destroy({
    where: { taskTitle: req.body },
    })
    .then((num) => {
        if (num == 1) {
            res.send({
                message: "Tasks was deleted successfully!",
            });
        } else {
            res.send({
                message: "record not found!",
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error!",
        });
    });
};
// Delete all tasks from the database.
exports.deleteAll = (req, res) => {};
// Find all published tasks

