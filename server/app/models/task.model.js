module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        taskTitle: {
            type: Sequelize.STRING,
            required: true  
        },
        description: {
            type: Sequelize.STRING,
        },
        dueDate: {
            type: Sequelize.DATEONLY,
        },
        
        priority: {
            type: Sequelize.STRING,
        },
    });
    return Task;
};
