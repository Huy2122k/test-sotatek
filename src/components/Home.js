import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import Task from "./Task.js";
import taskDataService from "../services/task.service";

const Home = () => {
    const [taskData, setTaskData] = useState([]);
    const [titleSearch, setTitleSearch] = useState('');
    const [hasConnect, setConnect] = useState(true);
    

    const getTaskListData = () => {
        if(hasConnect){
            taskDataService
            .getAll(titleSearch)
            .then((response) => {
                let dataReceived = response.data
                console.log(response.data);
                dataReceived.sort(function (a, b) {
                        return new Date(a.dueDate) - new Date(b.dueDate);
                });
                localStorage.setItem("task-list-local", JSON.stringify(dataReceived));
                setTaskData([...dataReceived]);
            })
            .catch((e) => {
                alert("server error, using localStorage!")
                console.log(e);
                setConnect(false);
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
        else{
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
        }
    }

    const handleDeleteTask = (taskTitle) => {
        let tempData = taskData;
        tempData = tempData.filter((item) => !taskTitle.includes(item.taskTitle));
        localStorage.setItem("task-list-local", JSON.stringify(tempData));
        if(hasConnect){
            taskDataService
                .delete(taskTitle)
                .then((response) => {

                    console.log(response.data);
                    getTaskListData();
                })
                .catch((e) => {
                    alert("delete task error")
                    console.log(e);
                });
        }else{
            getTaskListData();
        }
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
        if(hasConnect){
            let dataSend = {
                oldTitle: oldTitle,
                task: task,
            }
            taskDataService
                .update(dataSend)
                .then((response) => {
                    console.log(response.data);
                    getTaskListData();
                    alert("successfully updated");
                })
                .catch((e) => {
                    console.log(e);
                    alert("update error");
                }); 
        }
        else{
            getTaskListData();
            alert("successfully updated");
        }

    };

    const handleAddTask = (task) => {
        if(taskData.some((element) => element.taskTitle === task.taskTitle)) {
            alert("task has already existed!");
            return;
        }
        let tempData = taskData;
        tempData.push(task);
        localStorage.setItem("task-list-local", JSON.stringify(tempData));
        if(hasConnect){
            taskDataService
            .create(task)
            .then((response) => {
                console.log(response.data);
                getTaskListData();
            })
            .catch((e) => {
                console.log(e);
            });
        }else{
            getTaskListData();

        }
        
    }
    useEffect(() => {
        getTaskListData();
    }, [titleSearch]);
    return (
        <div className="container">
            <div className="AlignLeft CusForm">
                <h3 >
                    Create a new task ➕
                </h3>
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
                    selectedItem = {[]}
                    title = {''}
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
