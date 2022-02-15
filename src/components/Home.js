import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import Task from "./Task.js";
import taskDataService from "../services/task.service";

const Home = () => {
    const [taskData, setTaskData] = useState([]);
    const [titleSearch, setTitleSearch] = useState('');


    const getTaskListData = () => {
        taskDataService
            .getAll(titleSearch)
            .then((response) => {
                let dataReceived = response.data
                console.log(response.data);
                dataReceived.sort(function (a, b) {
                        return new Date(a.dueDate) - new Date(b.dueDate);
                });
                setTaskData([...dataReceived]);
            })
            .catch((e) => {
                alert("server error, using localStorage!")
                console.log(e);
                if ("task-list-local" in localStorage) {
                    let arrayData = JSON.parse(
                        localStorage.getItem("task-list-local")
                    );
                    if (titleSearch !== "") {
                        arrayData = arrayData.filter((task) =>
                        task.taskTitle.includes(titleSearch)
                        );
                    }
                    arrayData.sort(function (a, b) {
                        return new Date(a.dueDate) - new Date(b.dueDate);
                    });
                    setTaskData([...arrayData]);
                }
            });
    }

    const handleDeleteTask = (taskTitle) => {
        let tempData = taskData;
        tempData = tempData.filter((item) => !taskTitle.includes(item.taskTitle));
        localStorage.setItem("task-list-local", JSON.stringify(tempData));
        taskDataService
            .delete(taskTitle)
            .then((response) => {

                console.log(response.data);
                getTaskListData();
            })
            .catch((e) => {
                console.log(e);
            });
    }
    const handleUpdateTask = (task,oldTitle) => {
        if(taskData.some((element) => ((element.taskTitle === task.taskTitle) && (element.taskTitle !== oldTitle)))) {
            alert("task has already existed!");
            return;
        }
        let tempData = taskData;
        tempData = tempData.filter((item) => item.taskTitle !== oldTitle);
        tempData.push(task);
        localStorage.setItem("task-list-local", JSON.stringify(tempData));
        let datasend = {
            oldTitle: oldTitle,
            task: task,
        }
        taskDataService
            .update(datasend)
            .then((response) => {
                console.log(response.data);
                getTaskListData();
                alert("successfully updated");
            })
            .catch((e) => {
                console.log(e);
                alert("update error");
            });
    };

    const handleAddTask = (task) => {
        if(taskData.some((element) => element.taskTitle === task.taskTitle)) {
            alert("task has already existed!");
            return;
        }
        let tempData = taskData;
        tempData.push(task);
        localStorage.setItem("task-list-local", JSON.stringify(tempData));
        taskDataService
            .create(task)
            .then((response) => {
                console.log(response.data);
                getTaskListData();
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(() => {
        getTaskListData();
    }, [titleSearch]);
    return (
        <div className="container">
            <div className="AlignLeft CusForm">
                Create a new task!
                <Task
                    data = {{ 
                            taskTitle:"",
                            description:"",
                            dueDate: (new Date().toISOString().split('T')[0]),
                            priority:"Normal",
                        }
                    }
                    isAddTask = {true}
                    setActiveItem={-2}
                    index={-2}
                    handleAddTask={handleAddTask}
                    handleUpdateTask={handleUpdateTask}
                    handleDeleteTask={handleDeleteTask}
                    activeItem={-2}
                >
                </Task>
            </div>
            <TaskList 
                data = {taskData}
                handleAddTask={handleAddTask}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
                handleSearch={setTitleSearch}
            />
        </div>
    );
}
export default Home;
